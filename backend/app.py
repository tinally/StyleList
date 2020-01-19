# Import required libraries
import pandas as pd
import pandas as pd
import numpy as np
import re
from gensim import utils
from gensim.models.doc2vec import LabeledSentence
from gensim.models.doc2vec import TaggedDocument
from gensim.models import Doc2Vec
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.metrics import accuracy_score

import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

import flask
app = flask.Flask(__name__)

# Special Characters
def remove_special_characters(text):
    # review_text = re.sub(r"[^A-Za-z0-9(),!.?\'`]", "", text)
    text = text.replace(",", "")
    text = text.replace("<", "")
    text = text.replace(">", "")
    text = text.replace("main ", "")
    text = text.replace("color ", "")
    text = text.replace("see full details", "")
    text = text.replace("/", "")
    text = text.replace("  ", " ")
    text = text.replace(" .", "")
    text = text.replace("Free Shipping & Returns See more", "")
    return text

def train_fashion_model(labeled_questions):
    model = Doc2Vec(dm = 1, min_count=1, window=10, size=150, sample=1e-4, negative=10)
    model.build_vocab(labeled_questions)

    # Train the model with 20 epochs
    for epoch in range(20):
        model.train(labeled_questions,epochs=model.iter,total_examples=model.corpus_count)
        print("Epoch #{} is complete.".format(epoch+1))
    
    return model

def get_similarity_scores(df, target, likes_indices, dislikes_indices):
    scores = []
    for index, row in df.iterrows():
        if (index not in likes_indices) and (index not in dislikes_indices):
            scores.append(model.n_similarity(target, row['links_details'].split() + row['links_more_details'].split()))
        else:
            # we do not want repeated images (that have been shown)
            scores.append(0)
    return scores

def preprocess(df):
    # Check for null values
    # df[df.isnull().any(axis=1)]
    
    # Drop rows with null Values
    # df.drop(df[df.isnull().any(axis=1)].index,inplace=True)

    # Add a column for unique ids
    df['id'] = [str(i) for i in range(df.shape[0])]

    # Remove stop words
    stop_words = set(stopwords.words('english'))

    labeled_questions = []
    for index, row in df.iterrows():
        q1 = word_tokenize(row['links_details'])
        q2 = word_tokenize(row['links_more_details'])
        q1_filtered = [w.lower() for w in q1 if not w in stop_words]
        q2_filtered = [w.lower() for w in q2 if not w in stop_words]
        final_q1 = remove_special_characters(' '.join([str(elem) for elem in q1_filtered]))
        final_q2 = remove_special_characters(' '.join([str(elem) for elem in q2_filtered]))
        df.loc[index, 'links_details'] = final_q1
        df.loc[index, 'links_more_details'] = final_q2
        labeled_questions.append(TaggedDocument(final_q1.split() + final_q2.split(), df[df.index == index].id))
    return labeled_questions

def find5largest(scores):
    temp = scores[:]
    temp.sort()
    temp = temp[::-1]
    indices = []
    for i in range(5):
        val = temp[i]
        indices.append(scores.index(val))
    return indices

@app.route('/suggestions', methods=['GET'])
def finder():
    likes = flask.request.args.get('liked')
    dislikes = flask.request.args.get('disliked')
    print(likes)
    print(dislikes)
    print(len(df))
    if likes == "" and dislikes == "":
        max_indices = []
        for i in range(5):
            c = np.random.randint(df.shape[0]-1)
            while c in max_indices:
                c = np.random.randint(df.shape[0]-1)
            max_indices.append(c)
    elif likes == "" and dislikes != "":
        dislikes_indices = [int(i) for i in dislikes.split(",")]
        max_indices = []
        for i in range(5):
            c = np.random.randint(df.shape[0]-1)
            while c in max_indices or c in dislikes_indices:
                c = np.random.randint(df.shape[0]-1)
            max_indices.append(c)
    elif likes != "":
        likes_indices = [int(i) for i in likes.split(",")]
        dict = {}
        for idx in likes_indices:
            target = df.loc[idx, 'links_details'].split() + df.loc[idx, 'links_more_details'].split()
            if dislikes == "":
                scores = get_similarity_scores(df, target, likes_indices, [])
            else:
                dislikes_indices = [int(i) for i in dislikes.split(",")]
                scores = get_similarity_scores(df, target, likes_indices, dislikes_indices)
            max_indices = find5largest(scores)
            for elem in max_indices:
                if elem not in dict.keys() or dict[elem] < scores[elem]:
                    dict[elem] = scores[elem]
        sorted_dict = sorted(dict.items(), key=lambda x: x[1], reverse=True)
        max_indices = []
        for tup in sorted_dict[:5]:
            max_indices.append(tup[0])

    output = ""
    for i in max_indices:
        output += str(i) + ","
    response = flask.jsonify({'items': max_indices})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    # Import Data
    df_original = pd.read_csv('scraped_data.csv')
    df = df_original[:]

    labeled_questions = preprocess(df)
    print(df)

    model = train_fashion_model(labeled_questions)

    app.run()


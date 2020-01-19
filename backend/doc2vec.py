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
import io
import nltk

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

# Special Characters
def remove_special_characters(text):
    review_text = re.sub(r"[^A-Za-z0-9(),!.?\'`]", " ", text)
    review_text = re.sub(r",", " ", text)
    review_text = re.sub(r"\.", " ", text)
    review_text = re.sub(r"!", " ", text)
    review_text = re.sub(r"\(", " ( ", text)
    review_text = re.sub(r"\)", " ) ", text)
    review_text = re.sub(r"\?", " ", text)
    return review_text

def train_fashion_model(labeled_questions):
    model = Doc2Vec(dm = 1, min_count=1, window=10, size=150, sample=1e-4, negative=10)
    model.build_vocab(labeled_questions)

    # Train the model with 20 epochs
    for epoch in range(20):
        model.train(labeled_questions,epochs=model.iter,total_examples=model.corpus_count)
        print("Epoch #{} is complete.".format(epoch+1))
    
    return model

def get_similarity_scores(df, target_index):
    scores = []
    target = df.loc[target_index, 'question1'].split()
    for index, row in df.iterrows():
        if index != target_index:
            scores.append(model.n_similarity(target,row['question1'].split()))
            scores.append(model.n_similarity(target,row['question2'].split()))
        else:
            scores.append(0)
            scores.append(model.n_similarity(target,row['question2'].split()))
    results = np.array(scores)

    return results

def preprocess(df):
    # Check for null values
    df[df.isnull().any(axis=1)]

    # Drop rows with null Values
    df.drop(df[df.isnull().any(axis=1)].index,inplace=True)

    # Remove stop words
    stop_words = set(stopwords.words('english'))

    labeled_questions = []
    for index, row in df.iterrows():
        q1 = word_tokenize(row['question1'])
        q2 = word_tokenize(row['question2'])
        q1_filtered = [w for w in q1 if not w in stop_words]
        q2_filtered = [w for w in q2 if not w in stop_words]
        final_q1 = remove_special_characters(" ".join(q1_filtered))
        final_q2 = remove_special_characters(" ".join(q2_filtered))
        df.loc[index, 'question1'] = final_q1
        df.loc[index, 'question2'] = final_q2
        labeled_questions.append(TaggedDocument(final_q1.split(), df[df.index == index].qid1))
        labeled_questions.append(TaggedDocument(final_q2.split(), df[df.index == index].qid2))
    
    return labeled_questions


if __name__ == "__main__":
    # Import Data
    df_original = pd.read_csv('questions.csv')
    df = df_original[:500]

    labeled_questions = preprocess(df)

    model = train_fashion_model(labeled_questions)
    model.most_similar('Google')

    id = 110
    results = get_similarity_scores(df, id)
    max_index = np.argmax(results)

    print(max_index)
    print(results[max_index])
    print(df_original.loc[id, 'question1'])

    if max_index % 2 == 0:
        print(df_original.loc[max_index // 2, 'question1'])
    else:
        print(df_original.loc[max_index // 2, 'question2'])

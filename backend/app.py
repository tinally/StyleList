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

from flask import Flask, request
app = Flask(__name__)

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

def get_similarity_scores(df, target_indices, full_sentence):
    scores = []
    target = full_sentence.split()
    for index, row in df.iterrows():
        if index not in target_indices:
            scores.append(model.n_similarity(target,row['colName'].split()))
        else:
            scores.append(0)
    return scores

def preprocess(df):
    # Check for null values
    df[df.isnull().any(axis=1)]

    # Drop rows with null Values
    df.drop(df[df.isnull().any(axis=1)].index,inplace=True)

    # Remove stop words
    stop_words = set(stopwords.words('english'))

    labeled_questions = []
    for index, row in df.iterrows():
        tokens = word_tokenize(row['question1'])
        tokens_filtered = [w for w in tokens if not w in stop_words]
        final_tokens = remove_special_characters(" ".join(tokens_filtered))
        df.loc[index, 'colName'] = final_tokens
        labeled_questions.append(TaggedDocument(final_tokens.split(), df[df.index == index].qid1))
    
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

@app.route('/')
def finder():
    ids = request.args.get('ids')
    id_array = ids.split(",")
    full_sentence = ""
    for id in id_array:
        full_sentence += df.loc[id, 'colName'] + " "
    scores = get_similarity_scores(df, id_array, full_sentence)
    max_indices = find5largest(scores)

    output = ""
    for i in max_indices:
        output += str(i) + ","
    return output[:-1]

if __name__ == '__main__':
    # Import Data
    df_original = pd.read_csv('questions.csv')
    df = df_original[:]

    labeled_questions = preprocess(df)

    model = train_fashion_model(labeled_questions)

    app.run()


import pandas as pd
from sklearn.linear_model import LinearRegression
import pickle

# Dataset load (ONLINE)
url = "https://raw.githubusercontent.com/stedy/Machine-Learning-with-R-datasets/master/insurance.csv"
df = pd.read_csv(url)

# Sirf required columns lo (IMPORTANT)
X = df[['age', 'bmi', 'children']]
y = df['charges']

# Fast model
model = LinearRegression()
model.fit(X, y)

# Save model
pickle.dump(model, open("model.pkl", "wb"))

print("Model created successfully!")
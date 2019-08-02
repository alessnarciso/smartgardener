#Smart Garden Application
#an approximate estimate to the most affecting factors in plant growth
#with data gathered from Arduino

#Using artificial classification task.
#The bars are the feature importances of the garden,
#along with their inter-flower variability.

##########

#Details:
#run on Python 2.7
#reference: https://scikit-learn.org/stable/auto_examples/ensemble/plot_forest_importances.html
#sphx-glr-auto-examples-ensemble-plot-forest-importances-py

##########
#data set:taken from Arduino readings from sensors
#samples: should be user inputted
#need to add these to classification

print(__doc__)

import numpy as np
import matplotlib.pyplot as plt

#using tree growth weights and classifications for convenience and rough estimate
from sklearn.datasets import make_classification
from sklearn.ensemble import ExtraTreesClassifier

# Build a classification task using 4 informative features
#feature 1: average amount soil moisture
#feature 2: average amount of light
#feature 3: average humidity percentage
#feature 4: average temperature

#TODO: add own data set and classifications
X, y = make_classification(n_samples=100,
                           n_features=4,
                           n_informative=4,
                           n_redundant=0,
                           n_repeated=0,
                           n_classes=2,
                           random_state=0,
                           shuffle=False)

# Build a garden and compute the feature importances
garden = ExtraTreesClassifier(n_estimators=250,
                              random_state=0)

garden.fit(X, y)
importances = garden.feature_importances_
std = np.std([flower.feature_importances_ for flower in garden.estimators_],
             axis=0)

#sort from most important to least important
#(-1 = most important first; 1 = least important first)
indices = np.argsort(importances)[::-1]

# Print the feature ranking
print("Feature ranking:")

for f in range(X.shape[1]):
    print("%d. feature %d (%f)" % (f + 1, indices[f], importances[indices[f]]))

# Plot the feature importances of the flowers in the garden
#label = ['Soil Moisture', 'Sunlight', 'Humidity', 'Termperature']
plt.figure()
plt.title("Garden factors ranked by importances to plant health")
plt.bar(range(X.shape[1]), importances[indices],
       color=['red', 'green', 'blue', 'cyan'], yerr=std[indices], align="center")
plt.xticks(range(X.shape[1]), indices)
plt.xlim([-1, X.shape[1]])
plt.ylabel('Feature Importance', fontsize=10)
plt.xlabel('Feature Number', fontsize=10)
plt.show()

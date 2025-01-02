import React, { useState } from "react";
import "./Styles/Content.css";
import "./Styles/Projects.css";

const Projects = () => {
  const [activeMainCategory, setActiveMainCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);

  // Data for categories and topics for the "Projects" tab
  const subCategoriesData = {
    machineLearning: [
      {
        name: "regressionMethods",
        topics: [
          { title: "Linear Regression", content: "Content for Linear Regression..." },
          { title: "Logistic Regression", content: "Content for Logistic Regression..." },
          { title: "Ridge Regression", content: "Content for Ridge Regression..." },
          { title: "Lasso Regression", content: "Content for Lasso Regression..." },
          { title: "Polynomial Regression", content: "Content for Polynomial Regression..." },
        ],
      },
      {
        name: "classificationMethods",
        topics: [
          { title: "SVM", content: "Content for Support Vector Machines..." },
          { title: "KNN", content: "Content for K-Nearest Neighbors..." },
          { title: "Decision Trees", content: "Content for Decision Trees..." },
          { title: "Random Forests", content: "Content for Random Forests..." },
          { title: "Naive Bayes", content: "Content for Naive Bayes..." },
        ],
      },
      {
        name: "clusteringMethods",
        topics: [
          { title: "K-Means Clustering", content: "Content for K-Means Clustering..." },
          { title: "Hierarchical Clustering", content: "Content for Hierarchical Clustering..." },
          { title: "DBSCAN", content: "Content for DBSCAN Algorithm..." },
          { title: "Gaussian Mixture Models", content: "Content for GMMs..." },
        ],
      },
    ],
    deepLearning: [
      {
        name: "neuralNetworks",
        topics: [
          { title: "Feedforward Networks", content: "Content for Feedforward Networks..." },
          { title: "Convolutional Networks", content: "Content for CNNs..." },
          { title: "Recurrent Networks", content: "Content for RNNs..." },
          { title: "Transformer Networks", content: "Content for Transformers..." },
        ],
      },
      {
        name: "optimizationMethods",
        topics: [
          { title: "Gradient Descent", content: "Content for Gradient Descent..." },
          { title: "Adam Optimizer", content: "Content for Adam Optimizer..." },
          { title: "RMSProp", content: "Content for RMSProp..." },
          { title: "Momentum", content: "Content for Momentum Optimization..." },
        ],
      },
      {
        name: "modelArchitectures",
        topics: [
          { title: "Autoencoders", content: "Content for Autoencoders..." },
          { title: "GANs", content: "Content for Generative Adversarial Networks..." },
          { title: "Attention Mechanisms", content: "Content for Attention Mechanisms..." },
          { title: "Seq2Seq Models", content: "Content for Sequence-to-Sequence Models..." },
        ],
      },
    ],
    dataScience: [
      {
        name: "dataPreprocessing",
        topics: [
          { title: "Data Cleaning", content: "Content for Data Cleaning..." },
          { title: "Data Normalization", content: "Content for Data Normalization..." },
          { title: "Feature Scaling", content: "Content for Feature Scaling..." },
          { title: "Encoding Categorical Data", content: "Content for Encoding Techniques..." },
        ],
      },
      {
        name: "dataVisualization",
        topics: [
          { title: "Matplotlib", content: "Content for Matplotlib Library..." },
          { title: "Seaborn", content: "Content for Seaborn Library..." },
          { title: "Plotly", content: "Content for Plotly Library..." },
          { title: "Tableau", content: "Content for Tableau..." },
        ],
      },
      {
        name: "statistics",
        topics: [
          { title: "Descriptive Statistics", content: "Content for Descriptive Statistics..." },
          { title: "Inferential Statistics", content: "Content for Inferential Statistics..." },
          { title: "Hypothesis Testing", content: "Content for Hypothesis Testing..." },
          { title: "Bayesian Statistics", content: "Content for Bayesian Statistics..." },
        ],
      },
    ],
    naturalLanguageProcessing: [
      {
        name: "languageModels",
        topics: [
          { title: "BERT", content: "Content for BERT Model..." },
          { title: "GPT", content: "Content for GPT Model..." },
          { title: "Word2Vec", content: "Content for Word2Vec Embeddings..." },
          { title: "FastText", content: "Content for FastText Embeddings..." },
        ],
      },
      {
        name: "textProcessing",
        topics: [
          { title: "Tokenization", content: "Content for Tokenization..." },
          { title: "Lemmatization", content: "Content for Lemmatization..." },
          { title: "Stopword Removal", content: "Content for Stopword Removal..." },
          { title: "Named Entity Recognition", content: "Content for NER..." },
        ],
      },
      {
        name: "evaluationMetrics",
        topics: [
          { title: "BLEU Score", content: "Content for BLEU Score..." },
          { title: "ROUGE Metrics", content: "Content for ROUGE Metrics..." },
          { title: "Perplexity", content: "Content for Perplexity in NLP..." },
          { title: "F1 Score", content: "Content for F1 Score in NLP..." },
        ],
      },
    ],
  };
  

  // Display-friendly names for main categories and subcategories
const categoryDisplayNames = {
  machineLearning: "Machine Learning",
  deepLearning: "Deep Learning",
  dataScience: "Data Science",
  naturalLanguageProcessing: "Natural Language Processing",
};


const subCategoryDisplayNames = {
    regressionMethods: "Regression Methods",
    classificationMethods: "Classification Methods",
    clusteringMethods: "Clustering Methods",
    neuralNetworks: "Neural Networks",
    optimizationMethods: "Optimization Methods",
    modelArchitectures: "Model Architectures",
    dataPreprocessing: "Data Preprocessing",
    dataVisualization: "Data Visualization",
    statistics: "Statistics",
    languageModels: "Language Models",
    textProcessing: "Text Processing",
    evaluationMetrics: "Evaluation Metrics",
  };
  

  // Render main category buttons (e.g., Machine Learning, Deep Learning)
  const renderMainCategories = () => {
    return (
      <div className="category-buttons">
        <h2>Select A Category</h2>
        <div className="cat-buttons">
                    {Object.keys(subCategoriesData).map((categoryKey) => (
          <button
            key={categoryKey}
            onClick={() => setActiveMainCategory(categoryKey)} // Show subcategories for the selected category
            className={`category-button ${activeMainCategory === categoryKey ? "active" : ""}`}
          >
            {categoryDisplayNames[categoryKey]}
          </button>
        ))}
        </div>

      </div>
    );
  };

  // Render subcategory buttons for selected main category (e.g., Regression Methods, Classification Methods)
  const renderSubCategories = () => {
    if (!activeMainCategory) return null;

    const subCategories = subCategoriesData[activeMainCategory];
    return (
      <div className="subcategory-buttons">
        {subCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveSubCategory(category); // Show topics for the selected subcategory
              setActiveTopic(null); // Reset topic when subcategory changes
            }}
            className={`subcategory-button ${activeSubCategory?.name === category.name ? "active" : ""}`}
          >
            {subCategoryDisplayNames[category.name]}
          </button>
        ))}
      </div>
    );
  };

  // Render topics and content in a two-column layout
  const renderTopicsAndContent = () => {
    if (!activeSubCategory) return null;

    return (
      <div className="two-column-layout">
        {/* Left Column: List of Topics */}
        <div className="topics-list">
          {activeSubCategory.topics.map((topic, index) => (
            <button
              key={index}
              onClick={() => setActiveTopic(topic)} // Set selected topic
              className={`topic-button ${activeTopic?.title === topic.title ? "active" : ""}`}
            >
              {topic.title}
            </button>
          ))}
        </div>

        {/* Right Column: Content of the Selected Topic */}
        <div className="topic-content">
          {activeTopic ? (
            <div>
              <h5>{activeTopic.title}</h5>
              <p>{activeTopic.content}</p>
            </div>
          ) : (
            <p>Select a topic to view its content.</p>
          )}
        </div>
      </div>
    );
  };

  // Back button to return to the main category view or subcategory view
  const renderBackButton = () => {
    if (activeSubCategory) {
      return (
        <button
          className="back-button"
          onClick={() => {
            setActiveSubCategory(null); // Reset subcategory to go back
            setActiveTopic(null); // Reset topic
          }}
        >
          Back to {categoryDisplayNames[activeMainCategory]}
        </button>
      );
    } else if (activeMainCategory) {
      return (
        <button
          className="back-button"
          onClick={() => {
            setActiveMainCategory(null); // Reset main category to go back
          }}
        >
          Back to Categories
        </button>
      );
    }
    return null;
  };
  
  return (
    <div className="projects-container">
      {/* Render Back Button */}
      {renderBackButton()}

      {/* Render Main Categories (e.g., Machine Learning, Deep Learning) */}
      {!activeMainCategory && renderMainCategories()}

      {/* Render Subcategories once a main category is selected */}
      {activeMainCategory && !activeSubCategory && renderSubCategories()}

      {/* Render Topics and Content in Two Columns */}
      {activeSubCategory && renderTopicsAndContent()}
    </div>
  );
};

export default Projects;

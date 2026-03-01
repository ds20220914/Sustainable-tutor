import React from 'react';

const HomePage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Sustainable Tutor</h1>
      <p style={styles.description}>
        Sustainable Tutor helps you create personalized learning materials 
        based on your current knowledge and learning goals. Using an advanced, 
        privacy-friendly language model, the platform generates exercises and examples 
        tailored to you, so you can practice effectively and progress step by step.
      </p>

      <h2 style={styles.subtitle}>How it works</h2>
      <ol>
        <li>Select your current level – where you are on Bloom’s Taxonomy.</li>
        <li>Set your learning goal – the level you want to achieve.</li>
        <li>Choose your preferred exercise type – multiple-choice questions, real-life examples, or applied scenarios.</li>
      </ol>

      <h2 style={styles.subtitle}>Why Sustainable Tutor</h2>
      <ul>
        <li>Personalized to your needs and goals</li>
        <li>Exercises based on educational research</li>
        <li>Uses a sustainable and privacy-conscious LLM</li>
        <li>Supports your growth through Bloom’s Taxonomy levels</li>
      </ul>

      <p style={styles.cta}>
        Start learning smarter today – select your level, set your goal, and let Sustainable Tutor create exercises just for you!
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
    lineHeight: 1.6,
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginTop: '30px',
    marginBottom: '10px',
  },
  description: {
    fontSize: '1.1rem',
  },
  cta: {
    marginTop: '30px',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
};

export default HomePage;
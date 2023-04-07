import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  AboutPage,
  AuthorPage,
  AuthorsPage,
  BookPage,
  ContactPage,
  HomePage,
  DiscoverPage,
  SigninPage,
  SignupPage,
} from './pages';

const App = () => (
  <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/about" element={<AboutPage />} />
          <Route exact path="/authors" element={<AuthorsPage />} />
          <Route exact path="/authors/:id" element={<AuthorPage />} />
          <Route exact path="/discover" element={<DiscoverPage />} />
          <Route exact path="/book/:id" element={<BookPage />} />
          <Route exact path="/contact" element={<ContactPage />} />
          <Route exact path="/signup" element={<SignupPage />} />
          <Route exact path="/signin" element={<SigninPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  </div>
);

export default App;

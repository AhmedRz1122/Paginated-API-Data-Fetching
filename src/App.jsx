import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const PaginatedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10); // Show 10 posts per page
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
    };

    fetchPosts();
  }, []);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Handle next page
  const nextPage = () => {
    if (currentPage < Math.ceil(posts.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
   
  };

  // Search functionality
  const filteredPosts = currentPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting functionality
  const sortedPosts = filteredPosts.sort((a, b) => {
    if (sortOption === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortOption === 'length') {
      return a.body.length - b.body.length;
    }
    return 0;
  });

  return (
    <div>
     
     <h1>Paginated Posts</h1>

{/* Search Bar */}
<input
 className='Search_bar'
  type="text"
  placeholder="Search by title..."
  onChange={(e) => setSearchTerm(e.target.value)}
  value={searchTerm}
/>

{/* Sort Dropdown */}
<select className='dropdown' onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
  <option value="">Sort by</option>
  <option value="title">Title</option>
  <option value="length">Content Length</option>
</select>
      {/* Posts List */}
      <ul className='container'>
        {sortedPosts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>

      {/* Pagination Buttons */}
      <div>
        <button className='previousbtn' onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button
        className='nextbtn'
          onClick={nextPage}
          disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
        >
          Next
        </button>
      </div>

      <p className='page'>
        Page {currentPage} of {Math.ceil(posts.length / postsPerPage)}
      </p>
    </div>
  );
};

export default PaginatedPosts;

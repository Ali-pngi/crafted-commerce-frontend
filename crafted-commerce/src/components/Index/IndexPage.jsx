import React from 'react';

const IndexPage = () => {
  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between mb-4">
        <button className="btn btn-outline-primary">My offers</button>
        <button className="btn btn-outline-primary">Watchlist</button>
        <button className="btn btn-outline-primary">Profile Manager</button>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <img src="image_url" className="card-img-top" alt="Product" />
            <div className="card-body">
              <h5 className="card-title">Price</h5>
              <button className="btn btn-outline-danger">
                <i className="bi bi-heart"></i>
              </button>
            </div>
          </div>
        </div>
        {/* Repeat similar blocks for other posts */}
      </div>
    </div>
  );
};

export default IndexPage;

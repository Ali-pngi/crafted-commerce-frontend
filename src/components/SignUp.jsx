import React from 'react';

const SignUp = () => {
  return (
    <div className="p-5 rounded" style={{ backgroundColor: '#f5f5f5' }}>
      <h3 className="mb-4">Sign-Up</h3>
      <form>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="UserName" />
        </div>
        <div className="mb-3">
          <input type="email" className="form-control" placeholder="Email" />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" placeholder="Password" />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" placeholder="Confirm Password" />
        </div>
        <button type="submit" className="btn btn-primary">Sign-Up</button>
        <button type="button" className="btn btn-secondary ms-3">Cancel</button>
      </form>
    </div>
  );
};

export default SignUp;

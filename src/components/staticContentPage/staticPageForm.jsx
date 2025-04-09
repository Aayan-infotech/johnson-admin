import React from 'react';
import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

const StaticPageForm = ({ page, onChange, onSave }) => {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Static Page</h2>

        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">
              Page Title
            </label>
            <input
              id="title"
              type="text"
              value={page.title}
              onChange={(e) => onChange('title', e.target.value)}
              placeholder="Enter page title"
              style={{padding:"10px", borderRadius:"10px", border:"none"}}
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-1">
              Page Content
            </label>
            <ReactQuill
              id="content"
              value={page.content}
              onChange={(value) => onChange('content', value)}
              theme="snow"
              className="bg-white"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={onSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticPageForm;

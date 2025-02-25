import React, { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";

// Supabase credentials
const supabaseUrl = "https://mulwphqfjewweyjhutfv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11bHdwaHFmamV3d2V5amh1dGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0MzE1ODAsImV4cCI6MjA1NTAwNzU4MH0.sNiBgSkTNQ-VFw_gm0DcVO8-PdGO2MGpUe9sDTYzYgc";

// Create a Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);


const FolderViewer = ({ bucketName, folderPath }) => {
  const [folders, setFolders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubfolders = async () => {
      try {
        const { data, error } = await supabase.storage
          .from(bucketName)
          .list(folderPath, { limit: 100, search: "" });

        if (error) {
          throw new Error(error.message);
        }

        // Structure the data more clearly
        const subfolders = data.filter(item => item.name.endsWith('/'));
        const files = data.filter(item => !item.name.endsWith('/'));

        setFolders({ subfolders, files });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching subfolders:', err);
        setError('Error fetching subfolders.');
        setLoading(false);
      }
    };

    fetchSubfolders();
  }, [bucketName, folderPath]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h3>Folder Structure of "{folderPath || 'Root'}" in "{bucketName}"</h3>
      
      {folders.subfolders.length > 0 && (
        <div>
          <h4>Subfolders:</h4>
          <ul>
            {folders.subfolders.map((folder) => (
              <li key={folder.name}>{folder.name}</li>
            ))}
          </ul>
        </div>
      )}

      {folders.files.length > 0 && (
        <div>
          <h4>Files:</h4>
          <ul>
            {folders.files.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      {folders.subfolders.length === 0 && folders.files.length === 0 && (
        <div>No items found in this folder.</div>
      )}
    </div>
  );
};

export default FolderViewer;


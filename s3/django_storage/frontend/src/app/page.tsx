"use client";

import { useState } from "react";

type FolderNode = {
  [key: string]: FolderNode | null;
};

export default function FolderUpload() {
  const [folderTree, setFolderTree] = useState<FolderNode | null>(null);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFolderUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    const paths: string[] = [];

    Array.from(files).forEach((file: File) => {
      formData.append("files", file);
      paths.push((file as any).webkitRelativePath || file.name);
    });

    console.log("Relative Paths:", paths);

    formData.append("name", projectName);
    formData.append("description", description);

    paths.forEach((path) => formData.append("paths", path));

    try {
      const res = await fetch("http://localhost:8000/gallery/upload-folder", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`Upload failed: ${errorData}`);
      }

      const data = await res.json();
      console.log("✅ Upload response:", data);

      setFolderTree(data.folder_structure || {});
      setUploadedFiles(data.uploaded_files || []);
    } catch (err: any) {
      console.error("Upload failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 border rounded-lg shadow-md max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upload Project Folder</h1>

      <div className="space-y-3 mb-4">
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="file"
          multiple
          // @ts-ignore
          webkitdirectory=""
          onChange={handleFolderUpload}
          className="border p-2 rounded w-full cursor-pointer"
        />
      </div>

      {loading && <p className="text-blue-600">Uploading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {folderTree && (
        <>
          <h2 className="text-lg font-semibold mt-4 mb-2">
            📂 Folder Structure
          </h2>
          <FolderTree node={folderTree} />
        </>
      )}

      {uploadedFiles.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mt-6 mb-2">✅ Uploaded Files</h2>
          <ul className="list-disc ml-6">
            {uploadedFiles.map((url, idx) => (
              <li key={idx}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {url.split("/").pop()}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function FolderTree({ node }: { node: FolderNode }) {
  if (!node) return null;

  return (
    <ul className="ml-6 list-disc">
      {Object.entries(node).map(([name, child]) => (
        <li key={name}>
          {child === null ? (
            <span>{name}</span>
          ) : (
            <>
              <strong>{name}</strong>
              <FolderTree node={child} />
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

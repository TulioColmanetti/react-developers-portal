import React, { useState } from 'react';

import Loading from '../components/utils/Loading';

const KB_SRC_URL = 'https://mvp-dfs-igti-dev-team.tribeplatform.com/collection/aCqjNu0G97n7?layout=basic';

export default function KnowledgeBasePage() {
  const [loading, setLoading] = useState(true);

  const handleIframeLoad = () => {
    setLoading(false);
  };

  return (
    <div className="flex flex-col space-y-2 max-w-6xl mx-auto p-4">
      {loading && (
        <div className="flex justify-center my-4">
          <Loading />
        </div>
      )}
      <iframe
        src={KB_SRC_URL}
        name="iframe_a"
        className="h-[93rem] w-full"
        title="Iframe Knowledge Base"
        onLoad={handleIframeLoad}
      />
    </div>
  );
}

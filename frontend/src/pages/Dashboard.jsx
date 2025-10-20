import { useState, useEffect } from 'react';

// Navigation Pane Component
function NavigationPane({ modules, onSubmoduleClick, searchQuery }) {
  // Client-side search filter
  const filterTree = (tree, q) => {
    if (!q) return tree;
    const ql = q.toLowerCase();
    return tree
      .map(sys => {
        const filteredModules = sys.modules
          .map(mod => {
            const filteredSubmodules = mod.submodules.filter(sub =>
              sub.name.toLowerCase().includes(ql)
            );
            return { ...mod, submodules: filteredSubmodules };
          })
          .filter(mod =>
            mod.submodules.length > 0 ||
            mod.module_name.toLowerCase().includes(ql) ||
            sys.system_name.toLowerCase().includes(ql)
          );
        return { ...sys, modules: filteredModules };
      })
      .filter(sys => sys.modules.length > 0);
  };

  const filteredModules = filterTree(modules, searchQuery);

  if (filteredModules.length === 0) {
    return (
      <div className="w-64 bg-white border-r p-4">
        <p className="text-gray-500">No modules found</p>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white border-r p-4 overflow-y-auto h-full">
      <h3 className="font-bold text-lg mb-4">Navigation</h3>
      {filteredModules.map((sys) => (
        <div key={sys.system_id} className="mb-4">
          <h4 className="font-semibold text-gray-800">{sys.system_name}</h4>
          {sys.modules.map((mod) => (
            <div key={mod.module_id} className="ml-2 mt-2">
              <div className="font-medium text-gray-700">{mod.module_name}</div>
              <ul className="ml-2 mt-1 space-y-1">
                {mod.submodules.map((sub) => (
                  <li
                    key={sub.id}
                    onClick={() => onSubmoduleClick(sub)}
                    className="text-blue-600 cursor-pointer hover:underline"
                  >
                    {sub.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// Content Pane Component
function ContentPane({ activeSubmodule }) {
  return (
    <div className="p-6">
      {activeSubmodule ? (
        <div>
          <h2 className="text-2xl font-bold mb-2">Module: {activeSubmodule.name}</h2>
          <p className="text-gray-600">Route: {activeSubmodule.route || 'N/A'}</p>
          <div className="mt-4 p-4 bg-white rounded shadow">
            <p>Content for this submodule would appear here.</p>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-2">Welcome to Dashboard</h2>
          <p className="text-gray-600">Select a submodule from the left navigation.</p>
        </div>
      )}
    </div>
  );
}

// Main Dashboard Component
export default function Dashboard({ onLogout, api }) {
  const [modules, setModules] = useState([]);
  const [activeSubmodule, setActiveSubmodule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await api.get('/modules');
        setModules(res.data);
      } catch (err) {
        console.error('Failed to load modules', err);
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, [api]);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search modules..."
            className="w-full p-2 border rounded text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          <NavigationPane 
            modules={modules} 
            onSubmoduleClick={setActiveSubmodule}
            searchQuery={searchQuery}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </header>
        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="p-6 text-center">Loading modules...</div>
          ) : (
            <ContentPane activeSubmodule={activeSubmodule} />
          )}
        </div>
      </div>
    </div>
  );
}
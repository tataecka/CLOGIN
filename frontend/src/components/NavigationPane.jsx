import { useState } from 'react';

export default function NavigationPane({ modules, onSubmoduleClick }) {
  const [search, setSearch] = useState('');

  const filtered = modules.map(sys => {
    const modules = sys.modules.map(mod => {
      const subs = mod.submodules.filter(s => 
        s.name.toLowerCase().includes(search.toLowerCase())
      );
      return { ...mod, submodules: subs };
    }).filter(m => 
      m.submodules.length || m.module_name.toLowerCase().includes(search.toLowerCase())
    );
    return { ...sys, modules };
  }).filter(s => 
    s.modules.length || s.system_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-64 bg-gray-800 text-white h-screen flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {filtered.map(sys => (
          <div key={sys.system_id} className="mb-4">
            <h3 className="font-bold text-lg mb-2">{sys.system_name}</h3>
            {sys.modules.map(mod => (
              <div key={mod.module_id} className="ml-2 mb-2">
                <div className="font-medium text-gray-300">{mod.module_name}</div>
                <ul className="ml-4 mt-1 space-y-1">
                  {mod.submodules.map(sub => (
                    <li
                      key={sub.id}
                      className="text-blue-400 cursor-pointer hover:text-blue-300 hover:underline"
                      onClick={() => onSubmoduleClick(sub)}
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
    </div>
  );
}
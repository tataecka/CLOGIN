export default function ContentPane({ activeSubmodule }) {
  if (!activeSubmodule) {
    return (
      <div className="p-6 text-gray-600">
        <h2 className="text-xl font-semibold">Welcome to Dashboard</h2>
        <p>Select a submodule from the left pane to get started.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{activeSubmodule.name}</h1>
      <div className="bg-white p-4 rounded shadow">
        <p>This is the content for <strong>{activeSubmodule.name}</strong>.</p>
        <p className="mt-2 text-sm text-gray-500">Route: {activeSubmodule.route || 'N/A'}</p>
      </div>
    </div>
  );
}
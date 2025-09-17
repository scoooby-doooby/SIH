import React, { useState } from 'react';
import { MapPin, Download, Navigation, Wifi, WifiOff, Layers, Search, Star } from 'lucide-react';

const Maps: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [downloadedMaps, setDownloadedMaps] = useState<string[]>(['Chennai', 'Madurai']);

  const districts = [
    { name: 'Chennai', places: 22, size: '45 MB', popular: true },
    { name: 'Madurai', places: 15, size: '32 MB', popular: true },
    { name: 'Coimbatore', places: 18, size: '38 MB', popular: true },
    { name: 'Tiruchirappalli', places: 12, size: '28 MB', popular: false },
    { name: 'Salem', places: 14, size: '30 MB', popular: false },
    { name: 'Tirunelveli', places: 16, size: '35 MB', popular: false },
    { name: 'Erode', places: 10, size: '25 MB', popular: false },
    { name: 'Vellore', places: 13, size: '29 MB', popular: false },
    { name: 'Thoothukudi', places: 11, size: '26 MB', popular: false },
    { name: 'Dindigul', places: 9, size: '22 MB', popular: false },
    { name: 'Thanjavur', places: 17, size: '36 MB', popular: true },
    { name: 'Kanyakumari', places: 8, size: '20 MB', popular: true }
  ];

  const popularPlaces = [
    { name: 'Meenakshi Temple', district: 'Madurai', type: 'Temple', rating: 4.8 },
    { name: 'Marina Beach', district: 'Chennai', type: 'Beach', rating: 4.6 },
    { name: 'Ooty Lake', district: 'Nilgiris', type: 'Lake', rating: 4.7 },
    { name: 'Kanyakumari Beach', district: 'Kanyakumari', type: 'Beach', rating: 4.9 },
    { name: 'Brihadeeswarar Temple', district: 'Thanjavur', type: 'Temple', rating: 4.8 },
    { name: 'Kodaikanal Lake', district: 'Dindigul', type: 'Lake', rating: 4.7 }
  ];

  const handleDownloadMap = (districtName: string) => {
    if (!downloadedMaps.includes(districtName)) {
      setDownloadedMaps([...downloadedMaps, districtName]);
      // Simulate download process
      setTimeout(() => {
        alert(`${districtName} map downloaded successfully!`);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen px-4 md:px-8 mt-12">
      {/* Header */}
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4">
          Interactive Maps
        </h1>
        <p className="text-white/80 text-lg mb-6">
          Explore Tamil Nadu with detailed offline maps. Download district maps for seamless navigation without internet connectivity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="backdrop-blur-lg bg-green-500/20 border border-green-400/30 rounded-2xl p-4 text-center">
            <WifiOff className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold mb-1">Offline Ready</h3>
            <p className="text-white/80 text-sm">Works without internet</p>
          </div>
          <div className="backdrop-blur-lg bg-blue-500/20 border border-blue-400/30 rounded-2xl p-4 text-center">
            <Navigation className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold mb-1">GPS Navigation</h3>
            <p className="text-white/80 text-sm">Turn-by-turn directions</p>
          </div>
          <div className="backdrop-blur-lg bg-purple-500/20 border border-purple-400/30 rounded-2xl p-4 text-center">
            <Layers className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold mb-1">Detailed Layers</h3>
            <p className="text-white/80 text-sm">Points of interest included</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Visualization */}
        <div className="lg:col-span-2">
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Tamil Nadu Map</h2>
              <div className="flex space-x-2">
                <button className="backdrop-blur-lg bg-white/20 border border-white/30 text-white px-4 py-2 rounded-xl hover:bg-white/30 transition-all flex items-center space-x-1">
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
                <button className="backdrop-blur-lg bg-white/20 border border-white/30 text-white px-4 py-2 rounded-xl hover:bg-white/30 transition-all flex items-center space-x-1">
                  <Layers className="w-4 h-4" />
                  <span>Layers</span>
                </button>
              </div>
            </div>

            {/* Interactive Map Placeholder */}
            <div className="relative bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-2xl h-96 flex items-center justify-center border border-white/20">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Interactive Map</h3>
                <p className="text-white/80 mb-4">Click on districts to explore places and download offline maps</p>
                
                {/* Simulated District Buttons */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-w-md mx-auto">
                  {districts.slice(0, 6).map((district) => (
                    <button
                      key={district.name}
                      onClick={() => setSelectedDistrict(district.name)}
                      className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                        selectedDistrict === district.name
                          ? 'bg-cyan-500 text-white'
                          : 'backdrop-blur-lg bg-white/20 border border-white/30 text-white hover:bg-white/30'
                      }`}
                    >
                      {district.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected District Info */}
            {selectedDistrict && (
              <div className="mt-6 backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">{selectedDistrict} District</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">
                      {districts.find(d => d.name === selectedDistrict)?.places}
                    </div>
                    <div className="text-white/80 text-sm">Places</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-1">
                      {districts.find(d => d.name === selectedDistrict)?.size}
                    </div>
                    <div className="text-white/80 text-sm">Map Size</div>
                  </div>
                  <div className="text-center">
                    <button
                      onClick={() => handleDownloadMap(selectedDistrict)}
                      className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center space-x-1 mx-auto ${
                        downloadedMaps.includes(selectedDistrict)
                          ? 'bg-green-500 text-white cursor-not-allowed'
                          : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:from-cyan-500 hover:to-blue-600'
                      }`}
                      disabled={downloadedMaps.includes(selectedDistrict)}
                    >
                      <Download className="w-4 h-4" />
                      <span>{downloadedMaps.includes(selectedDistrict) ? 'Downloaded' : 'Download'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Downloaded Maps */}
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <WifiOff className="w-5 h-5 text-green-400" />
              <span>Downloaded Maps</span>
            </h3>
            <div className="space-y-3">
              {downloadedMaps.map((map) => (
                <div key={map} className="backdrop-blur-lg bg-green-500/20 border border-green-400/30 rounded-2xl p-3 flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">{map}</div>
                    <div className="text-green-400 text-sm">Ready for offline use</div>
                  </div>
                  <div className="text-green-400">
                    <WifiOff className="w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Places */}
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Popular Places</h3>
            <div className="space-y-3">
              {popularPlaces.map((place, index) => (
                <div key={index} className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-1">{place.name}</h4>
                      <div className="text-white/60 text-sm mb-2">{place.district} • {place.type}</div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-yellow-400 text-sm">{place.rating}</span>
                      </div>
                    </div>
                    <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      <MapPin className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Download All */}
          <div className="backdrop-blur-lg bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-white/20 rounded-3xl p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Download All Maps</h3>
            <p className="text-white/80 text-sm mb-4">Get complete offline access to all Tamil Nadu districts</p>
            <div className="text-2xl font-bold text-cyan-400 mb-4">Total: 850 MB</div>
            <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3 rounded-2xl font-semibold hover:from-cyan-500 hover:to-blue-600 transition-all flex items-center justify-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Download All</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maps;
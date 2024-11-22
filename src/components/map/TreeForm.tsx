import React, { useState } from 'react';
import { Upload, X, MapPin } from 'lucide-react';
import { supabase } from '../../config/supabase';
import { useTrees } from '../../hooks/useTrees';

interface TreeFormProps {
  onClose: () => void;
  location: mapboxgl.LngLat | null;
  onSave?: () => void;
}

const TreeForm: React.FC<TreeFormProps> = ({ onClose, location, onSave }) => {
  const { addTree } = useTrees();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    common_name: '',
    botanical_name: '',
    dbh: '',
    height: '',
    crown_spread: '',
    tag_number: '',
    condition: 'good',
    maintenance: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const uploadFiles = async (files: FileList, prefix: string) => {
    const uploadedUrls = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${prefix}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('tree-assets')
        .upload(fileName, file);
      
      if (error) throw error;
      
      const { data: { publicUrl } } = supabase.storage
        .from('tree-assets')
        .getPublicUrl(fileName);
      
      uploadedUrls.push(publicUrl);
    }
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) return;
    
    setLoading(true);
    try {
      const photoInput = document.querySelector<HTMLInputElement>('input[accept="image/*"]');
      const docInput = document.querySelector<HTMLInputElement>('input[type="file"]:not([accept])');
      
      const photos = photoInput?.files ? await uploadFiles(photoInput.files, 'photos') : [];
      const documents = docInput?.files ? await uploadFiles(docInput.files, 'documents') : [];

      await addTree({
        location: [location.lng, location.lat],
        common_name: formData.common_name,
        botanical_name: formData.botanical_name,
        dbh: Number(formData.dbh),
        height: Number(formData.height),
        crown_spread: Number(formData.crown_spread),
        tag_number: formData.tag_number,
        condition: formData.condition,
        maintenance: formData.maintenance,
        photos,
        documents,
      });

      onSave?.();
      onClose();
    } catch (error) {
      console.error('Error saving tree:', error);
      alert('Failed to save tree. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed right-0 top-0 h-screen w-96 bg-white shadow-lg p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Add New Tree</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <X size={20} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {location && (
          <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-2">
            <MapPin size={20} className="text-emerald-600" />
            <div className="text-sm">
              <p className="font-medium">Selected Location:</p>
              <p className="text-gray-600">
                {location.lng.toFixed(6)}, {location.lat.toFixed(6)}
              </p>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Species</label>
          <input
            type="text"
            name="common_name"
            value={formData.common_name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Common name"
            required
          />
          <input
            type="text"
            name="botanical_name"
            value={formData.botanical_name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg mt-2"
            placeholder="Botanical name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Measurements</label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="dbh"
              value={formData.dbh}
              onChange={handleInputChange}
              className="p-2 border rounded-lg"
              placeholder="DBH (inches)"
              required
            />
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              className="p-2 border rounded-lg"
              placeholder="Height (feet)"
              required
            />
            <input
              type="number"
              name="crown_spread"
              value={formData.crown_spread}
              onChange={handleInputChange}
              className="p-2 border rounded-lg"
              placeholder="Crown spread (feet)"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tree Tag #</label>
          <input
            type="text"
            name="tag_number"
            value={formData.tag_number}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
            <option value="dead">Dead</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Recommended Maintenance</label>
          <textarea
            name="maintenance"
            value={formData.maintenance}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Photos</label>
          <label className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer block">
            <Upload className="mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
            <input type="file" multiple accept="image/*" capture="environment" className="hidden" />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Documents</label>
          <label className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer block">
            <Upload className="mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Upload related documents</p>
            <input type="file" multiple className="hidden" />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Tree'}
        </button>
      </form>
    </div>
  );
};

export default TreeForm;
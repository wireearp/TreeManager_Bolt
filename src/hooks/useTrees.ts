import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import type { Tree } from '../config/supabase';

export const useTrees = () => {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrees = async () => {
    try {
      const { data, error } = await supabase
        .from('trees')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTrees(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTree = async (treeData: Omit<Tree, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('trees')
        .insert([treeData])
        .select()
        .single();

      if (error) throw error;
      setTrees(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateTree = async (id: number, updates: Partial<Tree>) => {
    try {
      const { data, error } = await supabase
        .from('trees')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setTrees(prev => prev.map(tree => tree.id === id ? data : tree));
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteTree = async (id: number) => {
    try {
      const { error } = await supabase
        .from('trees')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTrees(prev => prev.filter(tree => tree.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchTrees();
  }, []);

  return {
    trees,
    loading,
    error,
    addTree,
    updateTree,
    deleteTree,
    refreshTrees: fetchTrees,
  };
};
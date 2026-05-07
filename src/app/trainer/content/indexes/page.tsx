/*
 * Indexes Management Page
 * Create and manage content indexes (Setup, Training, etc.)
 */

'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Modal } from '@/components/ui/modal';
import { SearchInput } from '@/components/ui/search-input';
import { EmptyState } from '@/components/ui/empty-state';
import { Badge } from '@/components/ui/badge';
import { Plus, FolderOpen, BookOpen, Edit, Trash2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Index {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  course_count: number;
}

export default function IndexesPage() {
  const [indexes, setIndexes] = useState<Index[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<Index | null>(null);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchIndexes();
  }, []);

  const fetchIndexes = async () => {
    try {
      const res = await fetch('/api/indexes');
      const json = await res.json();
      if (json.success) {
        setIndexes(json.indexes);
      }
    } catch (error) {
      console.error('Failed to fetch indexes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const url = editingIndex ? `/api/indexes/${editingIndex.id}` : '/api/indexes';
      const method = editingIndex ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });

      const json = await res.json();

      if (!json.success) {
        setError(json.error);
        setSaving(false);
        return;
      }

      if (editingIndex) {
        setIndexes(indexes.map((i) => (i.id === editingIndex.id ? { ...i, ...json.index } : i)));
      } else {
        setIndexes([{ ...json.index, course_count: 0 }, ...indexes]);
      }

      closeModal();
    } catch (err) {
      console.error('Failed to save index:', err);
      setError('Failed to save index');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (index: Index) => {
    if (!confirm(`Delete "${index.name}"? This will delete all courses, sections, and lectures under it.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/indexes/${index.id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setIndexes(indexes.filter((i) => i.id !== index.id));
      }
    } catch (error) {
      console.error('Failed to delete index:', error);
    }
  };

  const openCreateModal = () => {
    setEditingIndex(null);
    setName('');
    setDescription('');
    setError('');
    setShowModal(true);
  };

  const openEditModal = (index: Index) => {
    setEditingIndex(index);
    setName(index.name);
    setDescription(index.description || '');
    setError('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingIndex(null);
  };

  const filteredIndexes = indexes.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Header title="Indexes" />

      <div className="p-6">
        <Card>
          <CardHeader
            title="Content Indexes"
            description="Organize your courses into categories"
            action={
              <Button onClick={openCreateModal}>
                <Plus className="w-4 h-4 mr-2" />
                Create Index
              </Button>
            }
          />
          <CardContent>
            <div className="mb-6">
              <SearchInput
                placeholder="Search indexes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClear={() => setSearch('')}
              />
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-40 bg-paper-dim rounded-xl skeleton" />
                ))}
              </div>
            ) : filteredIndexes.length === 0 ? (
              <EmptyState
                icon={FolderOpen}
                title="No indexes found"
                description={search ? 'Try a different search term' : 'Create your first index to organize courses'}
                action={!search ? { label: 'Create Index', onClick: openCreateModal } : undefined}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredIndexes.map((index) => (
                  <div
                    key={index.id}
                    className="bg-paper-dim/50 border border-rule rounded-xl p-5 hover:border-rule transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-900/30 rounded-lg">
                          <FolderOpen className="w-5 h-5 text-ochre" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-ink">{index.name}</h3>
                          <p className="text-xs text-ink-faint">{formatDate(index.created_at)}</p>
                        </div>
                      </div>
                      <Badge variant={index.is_active ? 'success' : 'danger'} size="sm">
                        {index.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>

                    {index.description && (
                      <p className="text-sm text-ink-mute mb-4 line-clamp-2">{index.description}</p>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-rule">
                      <div className="flex items-center gap-1 text-sm text-ink-mute">
                        <BookOpen className="w-4 h-4" />
                        <span>{index.course_count} courses</span>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => openEditModal(index)}
                          className="p-2 hover:bg-paper-warm rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4 text-ink-mute" />
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="p-2 hover:bg-paper-warm rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-crimson" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={editingIndex ? 'Edit Index' : 'Create Index'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            id="name"
            label="Index Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Setup, Training, Advanced"
            required
          />
          <Textarea
            id="description"
            label="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of this index..."
            rows={3}
          />

          {error && (
            <div className="bg-crimson/10 border border-crimson/30 text-crimson px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" loading={saving}>
              {editingIndex ? 'Save Changes' : 'Create Index'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

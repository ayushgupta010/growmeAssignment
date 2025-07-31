import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { fetchArtworks } from './services/artworkService';
import { Artwork, ArtworkResponse } from './types/artwork';
import './App.css';

function App() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    first: 0,
    rows: 12,
    page: 0,
    pageCount: 0,
    totalRecords: 0
  });
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
  const [selectionCount, setSelectionCount] = useState<number>(0);
  const op = useRef<OverlayPanel>(null);

  const fetchData = async (page: number) => {
    console.log('Fetching data for page:', page);
    setLoading(true);
    setError(null);
    try {
      const response: ArtworkResponse = await fetchArtworks(page);
      console.log('API response:', response);
      setArtworks(response.data);
      setPagination(prev => ({
        ...prev,
        first: (page - 1) * prev.rows,
        page: page - 1,
        pageCount: response.pagination.total_pages,
        totalRecords: response.pagination.total
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load artworks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('App component mounted');
    fetchData(1);
  }, []);

  const onPageChange = (event: any) => {
    const newPage = event.page + 1;
    fetchData(newPage);
  };

  const onSelectionChange = (event: any) => {
    setSelectedArtworks(event.value);
  };

  const selectByCount = async () => {
    if (selectionCount <= 0) return;
    
    const currentPage = pagination.page + 1;
    const totalSelected = selectedArtworks.length;
    const remainingToSelect = selectionCount - totalSelected;
    
    if (remainingToSelect <= 0) {
      setSelectedArtworks(selectedArtworks.slice(0, selectionCount));
      return;
    }
    
    const currentPageArtworks = [...artworks];
    const newSelection = [...selectedArtworks, ...currentPageArtworks];
    
    if (newSelection.length < selectionCount && currentPage < pagination.pageCount) {
      let nextPage = currentPage + 1;
      let tempSelection = [...newSelection];
      
      while (tempSelection.length < selectionCount && nextPage <= pagination.pageCount) {
        try {
          const response: ArtworkResponse = await fetchArtworks(nextPage);
          const pageArtworks = response.data.slice(0, selectionCount - tempSelection.length);
          tempSelection = [...tempSelection, ...pageArtworks];
          nextPage++;
        } catch (error) {
          console.error('Error fetching page for selection:', error);
          break;
        }
      }
      
      setSelectedArtworks(tempSelection.slice(0, selectionCount));
    } else {
      setSelectedArtworks(newSelection.slice(0, selectionCount));
    }
  };



  const titleHeaderTemplate = () => (
    <div className="flex align-items-center">
      <Button
        icon="pi pi-chevron-down"
        className="p-button-text p-button-sm"
        style={{ 
          fontSize: '0.6rem', 
          padding: '4px', 
          width: '20px', 
          height: '20px',
          borderRadius: '2px'
        }}
        onClick={(e) => op.current?.toggle(e)}
      />
      <span>Title</span>
    </div>
  );

  const selectionPanelTemplate = () => (
    <div className="p-3">
      <input
        type="text"
        placeholder="Select rows..."
        value={selectionCount || ''}
        onChange={(e) => setSelectionCount(parseInt(e.target.value) || 0)}
        className="p-inputtext p-component"
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <Button
        label="Submit"
        onClick={selectByCount}
        disabled={selectionCount <= 0}
        className="p-button-sm"
        style={{ width: '100%' }}
      />
    </div>
  );

  return (
    <div className="app-container">
      
      {error && (
        <div style={{ padding: '10px', backgroundColor: '#ffebee', color: '#c62828', margin: '10px 0', borderRadius: '4px' }}>
          {error}
        </div>
      )}
      
      <div className="card">
        {loading && <p>Loading artworks...</p>}
        {!loading && artworks.length === 0 && !error && <p>No artworks available</p>}
        {artworks.length > 0 && (
                     <DataTable
             value={artworks}
             paginator
             rows={pagination.rows}
             totalRecords={pagination.totalRecords}
             lazy
             first={pagination.first}
             onPage={onPageChange}
             loading={loading}
             selection={selectedArtworks}
             onSelectionChange={onSelectionChange}
             selectionMode="multiple"
             dataKey="id"
             emptyMessage="No artworks found."
             className="p-datatable-sm"
           >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: '3rem' }}
            />
            <Column
              field="title"
              header={titleHeaderTemplate}
              style={{ minWidth: '200px' }}
            />
            <Column
              field="artist_display"
              header="Artist"
              style={{ minWidth: '150px' }}
            />
            <Column
              field="place_of_origin"
              header="Origin"
              style={{ minWidth: '120px' }}
            />
            <Column
              field="date_start"
              header="Start Date"
            
              style={{ minWidth: '100px' }}
            />
            <Column
              field="date_end"
              header="End Date"
              style={{ minWidth: '100px' }}
            />
            <Column
              field="inscriptions"
              header="Inscriptions"
              style={{ minWidth: '200px' }}
            />
          </DataTable>
        )}
      </div>
      
      <OverlayPanel
        ref={op}
        className="selection-panel"
      >
        {selectionPanelTemplate()}
      </OverlayPanel>
    </div>
  );
}

export default App; 
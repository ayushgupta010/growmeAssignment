# Art Gallery - React TypeScript Application

A React application built with Vite and TypeScript that displays artwork data from the Art Institute of Chicago API using PrimeReact DataTable with server-side pagination and row selection.

## Features

- **React with TypeScript**: Built using Vite for fast development
- **PrimeReact DataTable**: Professional data table component with advanced features
- **Server-side Pagination**: Fetches data from the API for each page
- **Row Selection**: Select individual rows or all rows at once
- **Custom Selection Panel**: Overlay panel accessible via chevron icon next to the Title header
- **Persistent Selection**: Selected rows persist across page changes
- **Responsive Design**: Works on desktop and mobile devices

## API

The application uses the Art Institute of Chicago API:
- **Base URL**: `https://api.artic.edu/api/v1/artworks`
- **Pagination**: Uses `?page=X` parameter for server-side pagination
- **Data**: Displays artwork information including title, artist, date, medium, and dimensions

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Usage

### Table Features

- **Pagination**: Navigate through pages using the pagination controls at the bottom
- **Row Selection**: 
  - Click individual checkboxes to select/deselect rows
  - Use the custom selection panel for bulk operations
- **Custom Selection Panel**: Click the chevron down icon (▼) next to the "Title" header to open the selection panel
- **Sorting**: Click column headers to sort data

### Selection Panel

The custom selection panel provides:
- **Select All**: Select all visible rows on the current page
- **Unselect All**: Deselect all rows
- **Selection Counter**: Shows how many items are currently selected
- **Indeterminate State**: Shows when some (but not all) rows are selected

## Project Structure

```
src/
├── App.tsx              # Main application component
├── App.css              # Application styles
├── main.tsx             # Application entry point
├── index.css            # Global styles and PrimeReact imports
├── types/
│   └── artwork.ts       # TypeScript interfaces for artwork data
└── services/
    └── artworkService.ts # API service for fetching artwork data
```

## Technologies Used

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **PrimeReact**: Professional UI component library
- **PrimeIcons**: Icon library for PrimeReact components

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Development

```bash
npm run lint    # Run ESLint
npm run preview # Preview production build
```

## API Response Structure

The application expects the following API response structure:

```typescript
interface ArtworkResponse {
  data: Artwork[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
    next_url: string | null;
    prev_url: string | null;
  };
  // ... other fields
}
```

## Customization

- **Styling**: Modify `src/App.css` for custom styling
- **API**: Update `src/services/artworkService.ts` to use different endpoints
- **Columns**: Add or modify columns in `src/App.tsx`
- **Selection Logic**: Customize selection behavior in the App component 
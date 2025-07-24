# CLAUDE.md

必ず日本語で回答してください。
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Japanese trash day tracker application built with Next.js 14 and Material-UI. It helps users track when different types of trash can be put out on specific days of the week, with support for biweekly schedules.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

The application uses Next.js 14 with the app router and TypeScript. The main structure:

- **app/**: Next.js app router pages and components

  - `page.tsx`: Main trash day display page
  - `search/page.tsx`: Search functionality for trash items
  - `layout.tsx`: Root layout with Material-UI theming
  - `components/`: Page-specific components

- **features/**: Shared application features

  - `hooks/weekly-trash.ts`: Core biweekly trash schedule logic
  - `components/`: Reusable UI components like header and settings

- **public/**: Static assets
  - `json/trash-day.json`: Trash day configuration data
  - `csv/trush-search.csv`: Searchable trash item database

## Key Features

### Biweekly Schedule System

The app handles alternating weekly schedules using `features/hooks/weekly-trash.ts`:

- Base date: October 8, 2023
- Alternates between TRASH_SCHEDULE1 and TRASH_SCHEDULE2 every week
- Calculates current week type (even/odd) based on weeks elapsed since base date

### Trash Types

- 燃えるごみ (Burnable trash): Tuesday, Friday
- 缶 (Cans): Monday (even weeks)
- ペットボトル (PET bottles): Wednesday (even weeks)
- ビン・危険ごみ・古着類・白色トレイ (Bottles, hazardous, old clothes, white trays): Monday (odd weeks)
- 燃えないごみ・古紙類 (Non-burnable, old paper): Wednesday (odd weeks)

### Tech Stack

- Next.js 14 with App Router
- TypeScript
- Material-UI (@mui/material)
- Emotion for styling
- Node.js 20.9.0 (managed by Volta)

## Data Sources

The application uses two data sources:

1. `trash-day.json`: Basic weekly schedule mapping
2. `trush-search.csv`: Comprehensive searchable database of trash items with disposal categories

When working with schedule logic, always reference the biweekly calculation in `useWeeklyTrash` hook.

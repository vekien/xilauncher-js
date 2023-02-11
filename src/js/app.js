import { createRoot } from 'react-dom/client';
import React from 'react';
import Header from './header';
import Launcher from './launcher';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
    <div>
        <Header />
        <Launcher />
    </div>
);
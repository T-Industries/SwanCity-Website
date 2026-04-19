import { useState } from 'react';
import { FiDownload, FiExternalLink } from 'react-icons/fi';
import { GiSteak, GiBrandyBottle } from 'react-icons/gi';
import './Menu.css';

const MENUS = {
  food: {
    label: 'Food Menu',
    file: '/SwanCity_Food_Menu.pdf',
    tagline: 'Shareables, burgers, steaks, and everythin\' in between.',
    icon: GiSteak,
  },
  beverage: {
    label: 'Beverage Menu',
    file: '/SwanCity_Beverage_Menu.pdf',
    tagline: 'Cold beer, cocktails, bourbon, wine, and spirits.',
    icon: GiBrandyBottle,
  },
};

export default function Menu() {
  const [tab, setTab] = useState('food');
  const current = MENUS[tab];

  return (
    <div className="page-wrap menu-page">
      <header className="page-header">
        <div className="container">
          <span className="subtitle">— Come and Get It —</span>
          <h1>Our Menu</h1>
          <div className="star-rule light"><span className="star">★ ★ ★</span></div>
        </div>
      </header>

      <div className="container menu-body">
        <div className="menu-tabs" role="tablist">
          {Object.entries(MENUS).map(([key, m]) => {
            const Icon = m.icon;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={tab === key}
                className={`menu-tab ${tab === key ? 'active' : ''}`}
                onClick={() => setTab(key)}
              >
                <Icon size={20} />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>

        <p className="menu-tag">"{current.tagline}"</p>

        <div className="menu-actions">
          <a href={current.file} target="_blank" rel="noopener" className="btn btn-dark">
            <FiExternalLink /> Open in new tab
          </a>
          <a href={current.file} download className="btn btn-primary">
            <FiDownload /> Download PDF
          </a>
        </div>

        <div className="menu-card">
          <div className="menu-card-corner tl">★</div>
          <div className="menu-card-corner tr">★</div>
          <div className="menu-card-corner bl">★</div>
          <div className="menu-card-corner br">★</div>
          <object
            data={`${current.file}#toolbar=0&navpanes=0&view=FitH`}
            type="application/pdf"
            className="menu-pdf"
            aria-label={current.label}
          >
            <div className="menu-fallback">
              <p>Your browser can't display this PDF inline.</p>
              <a href={current.file} target="_blank" rel="noopener" className="btn btn-primary">
                Open {current.label}
              </a>
            </div>
          </object>
        </div>
      </div>
    </div>
  );
}

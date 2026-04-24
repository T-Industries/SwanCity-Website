import { useEffect, useRef, useState } from 'react';
import { GiSteak, GiBrandyBottle } from 'react-icons/gi';
import { foodMenu, beverageMenu } from '../data/menus.js';
import './Menu.css';

const MENUS = {
  food: { label: 'Food Menu',     data: foodMenu,     icon: GiSteak,        tagline: '' },
  beverage: { label: 'Beverage Menu', data: beverageMenu, icon: GiBrandyBottle, tagline: 'Cold beer, cocktails, bourbon, wine, and spirits.' },
};

function MenuSection({ section }) {
  const isTable = section.type === 'table';
  const isCompact = section.type === 'compact';

  return (
    <section id={section.id} className="menu-section">
      <header className="menu-section-header">
        <span className="star">★</span>
        <h2>{section.name}</h2>
        <span className="star">★</span>
      </header>
      {section.subtitle && <p className="menu-section-subtitle">{section.subtitle}</p>}
      {section.note && <p className="menu-section-note">{section.note}</p>}

      {isTable && (
        <div className="menu-table">
          <div className="menu-table-row menu-table-head">
            <span className="menu-table-name" />
            {section.sizes.map(s => (
              <span key={s} className="menu-table-size">{s}</span>
            ))}
          </div>
          {section.items.map((item, i) => (
            <div key={i} className="menu-table-row">
              <span className="menu-table-name">{item.name}</span>
              {item.prices.map((p, j) => (
                <span key={j} className="menu-table-price">{p}</span>
              ))}
            </div>
          ))}
        </div>
      )}

      {isCompact && (
        <ul className="menu-compact">
          {section.items.map((item, i) => (
            <li key={i}>
              <span className="menu-item-name">{item.name}</span>
              {item.price && <span className="menu-item-price">{item.price}</span>}
            </li>
          ))}
        </ul>
      )}

      {!isTable && !isCompact && (
        <ul className="menu-list">
          {section.items.map((item, i) => (
            <li key={i} className="menu-item">
              <div className="menu-item-head">
                <span className="menu-item-name">{item.name}</span>
                <span className="menu-item-leader" aria-hidden="true" />
                {item.price && <span className="menu-item-price">{item.price}</span>}
              </div>
              {item.desc && <p className="menu-item-desc">{item.desc}</p>}
              {item.extras && <p className="menu-item-extras">{item.extras}</p>}
            </li>
          ))}
        </ul>
      )}

      {section.footer && <p className="menu-section-footer">{section.footer}</p>}
    </section>
  );
}

export default function Menu() {
  const [tab, setTab] = useState('food');
  const [activeId, setActiveId] = useState(null);
  const current = MENUS[tab];
  const bodyRef = useRef(null);

  // Reset scroll when switching tabs
  useEffect(() => {
    window.scrollTo({ top: bodyRef.current?.offsetTop - 160 || 0, behavior: 'instant' });
    setActiveId(current.data[0]?.id || null);
  }, [tab]);

  // Track which section is in view — updates sticky nav highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-200px 0px -60% 0px', threshold: 0 }
    );
    current.data.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [tab]);

  const jumpTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 160;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <div className="page-wrap menu-page">
      <header className="page-header">
        <div className="container">
          <span className="subtitle">— Come and Get It —</span>
          <h1>Our Menu</h1>
          <div className="star-rule light"><span className="star">★ ★ ★</span></div>
        </div>
      </header>

      <div className="container menu-body" ref={bodyRef}>
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

        {current.tagline && <p className="menu-tag">"{current.tagline}"</p>}
      </div>

      <nav className="menu-catnav">
        <div className="container menu-catnav-inner">
          {current.data.map(s => (
            <button
              key={s.id}
              className={`menu-catnav-chip ${activeId === s.id ? 'active' : ''}`}
              onClick={() => jumpTo(s.id)}
            >
              {s.name}
            </button>
          ))}
        </div>
      </nav>

      <main className="container menu-content">
        {current.data.map(section => (
          <MenuSection key={section.id} section={section} />
        ))}
      </main>
    </div>
  );
}

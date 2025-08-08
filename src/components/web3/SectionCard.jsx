import React from 'react';

export default function SectionCard({ title, icon, children, className = '' }) {
  return (
    <div className={`card glass-card ${className}`}>
      {title && (
        <div className="card-header d-flex align-items-center gap-2">
          {icon && <i className={`me-2 ${icon}`} aria-hidden="true"></i>}
          <h5 className="mb-0">{title}</h5>
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
} 
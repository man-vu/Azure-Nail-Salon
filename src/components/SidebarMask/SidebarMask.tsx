import React from "react";

interface SidebarMaskProps {
  text?: React.ReactNode;
}

const SidebarMask: React.FC<SidebarMaskProps> = ({ text }) => (
  <div
    className="sidebar-mask"
    style={{
      position: 'absolute',
      inset: 0,
      zIndex: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'all',
      fontWeight: 500,
      fontSize: '1.08rem',
      borderRadius: 8,
      textAlign: 'center',
      userSelect: 'none',
    }}
  >
    {text ?? (
      <>
        
      </>
    )}
  </div>
);

export default SidebarMask;

const wrap = `
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const modal = `
  z-index: 1;
  display: inline-block;
  border-radius: 8px;
  max-width: 100%;
  padding: 10px 20px;
  background-color: white;
  font-size: 16px;
  text-align: center;
`;

const header = `
  font-size: 20px;
`;

const svgWrap = `
  width: 500px;
  max-width: 100%;
  padding: 40px;
`;

const backdrop = `
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default {
  wrap,
  modal,
  header,
  svgWrap,
  backdrop
};

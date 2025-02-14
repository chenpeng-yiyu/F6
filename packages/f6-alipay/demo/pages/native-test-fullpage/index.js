import G6 from '../../../../f6';

const data = {
  nodes: [
    { id: 'node0', size: 50 },
    { id: 'node1', size: 30 },
    { id: 'node2', size: 30 },
    { id: 'node3', size: 30 },
  ],
  edges: [
    { source: 'node0', target: 'node1' },
    { source: 'node0', target: 'node2' },
    { source: 'node0', target: 'node3' },
    { source: 'node1', target: 'node3' },
    { source: 'node2', target: 'node3' },
  ],
};

Page({
  data: {
    width: 300,
    height: 400,
    pixelRatio: 1,
  },
  onLoad() {
    const { windowWidth, windowHeight, pixelRatio } = my.getSystemInfoSync();
    this.setData({
      width: windowWidth,
      height: windowHeight,
      pixelRatio,
    });
  },
  onCanvasInit(ctx, rect, canvas) {
    console.log(ctx, rect, canvas);
    this.graph = new G6.Graph({
      context: ctx,
      renderer: 'mini-native',
      width: this.data.width,
      height: this.data.height,
      defaultNode: {
        color: '#5B8FF9',
      },
      modes: {
        default: ['drag-canvas', 'drag-node', 'zoom-canvas'],
      },
    });
    const { nodes } = data;
    this.graph.data({
      nodes,
      edges: data.edges.map((edge, i) => {
        edge.id = `edge${i}`;
        return Object.assign({}, edge);
      }),
    });
    this.graph.render();

    this.graph.on('panstart', (e) => {
      console.log('pan', e);
    });
    this.graph.on('panmove', (e) => {
      console.log('pan move', e);
    });
    this.graph.on('panend', (e) => {
      console.log('pan end', e);
    });
  },
  onTouch(e) {
    this.graph.emitEvent(e);
  },
});

<template>
    <div>
        <div id="container" style="width: 100%; height: 100vh"></div>
    </div>
</template>

<script>
import { getRelationship } from '@/api/file';
import G6 from "@antv/g6";
export default {
    name: "figureAnalysis",
    data() {
        return {
            graph: "",
            form: {
                fileType: "huobi",
                path: "from"
            }
        }
    },
    mounted() {
        this.initGraph()
        this.loadData()
    },
    methods: {
        //初始化画布
        initGraph() {
            let data = {};
            const container = document.getElementById("container");
            const width = container.scrollWidth;
            const height = container.scrollHeight || 500;
            const toolbar = new G6.ToolBar();
            //初始化图
            const graphObject = new G6.Graph({
                container: "container", // 指定挂载容器
                width: width, // 图的宽度
                height: '929', // 图的高度
                // 是否开启画布自适应。开启后图自动适配画布大小。
                fitView: true,
                fitCenter: true,
                //画布上四周的留白宽度
                // fitViewPadding: [20, 40, 50, 20],
                //设置交互模式
                linkCenter: true,
                // 交互
                modes: {
                    default: [
                        // 拖拽画布；
                        "drag-canvas",
                        // 缩放画布；
                        "zoom-canvas",
                        //拖拽节点
                        "drag-node",
                        //combo交互
                        "drag-combo",
                        "collapse-expand-combo",
                        // 'activate-relations',
                        // 拖动框选节点；
                        "brush-select",
                        //自由圈选
                        {
                            type: "lasso-select",
                            trigger: "shift",
                            includeEdges: true,
                        },
                        //选中节点高亮
                        {
                            type: "click-select",
                            trigger: "shift",
                        },
                        // 边提示框
                        // {
                        //   type: "edge-tooltip",
                        //   formatText(model) {
                        //     return model['label'] ;
                        //   },
                        // },
                    ],
                },
                // 最小缩放比例
                minZoom: 0.1,
                // 最大缩放比例
                maxZoom: 10,
                Zoom: 5,
                // 默认状态下边的配置，比如 type, size, color。会被写入的 data 覆盖。
                defaultEdge: {
                    // 指定边的类型，可以是内置边的类型名称，也可以是自定义边的名称。默认为 'line'
                    type: "quadratic",
                    // 边的样式属性
                    style: {
                        // 边的颜色
                        stroke: "#A3B1BF",
                        // 那个小手
                        cursor: "pointer",
                        // 箭头
                        endArrow: {
                            path: G6.Arrow.triangle(10, 20, 25), // 使用内置箭头路径函数，参数为箭头的 宽度、长度、偏移量（默认为 0，与 d 对应）
                            d: 25,
                            fill: "#030303",
                            stroke: "#dbe0db",
                            opacity: 0.5,
                            lineWidth: 3,
                            //当边太细交互不易命中时设置扩展值
                            lineAppendWidth: 5,
                        },
                        // startArrow: true
                    },
                    labelCfg: {
                        // autoRotate: true,
                        style: {
                            fill: "#1890ff",
                            fontSize: 8,
                            // 那个小手
                            cursor: "pointer",
                            background: {
                                fill: "#ffffff",
                                stroke: "#ffffff",
                                padding: [2, 2, 2, 2],
                                radius: 2,
                            },
                        },
                    },
                },
                // 默认状态下节点的配置，比如 type, size, color。会被写入的 data 覆盖。
                defaultNode: {
                    type: "circle",
                    // size 是单个数字，表示直径
                    size: 24,
                    // 节点样式
                    style: {
                        // 节点填充色
                        fill: "#C6E5FF",
                        // 节点的描边颜色，''就是没颜色的意思
                        stroke: "#000000",
                        // 那个小手
                        cursor: "pointer",
                    },
                    // Object 类型。配置标签文本
                    labelCfg: {
                        autoRotate: true,
                        position: "top",
                        // 标签的样式属性。
                        style: {
                            // 文本颜色
                            fill: "#000000",
                            // 文本字体大小
                            fontSize: 8,
                        },
                    },
                },
                //布局
                layout: {
                    text: "层次图",
                    type: "dagre",
                    preventOverlap: true, // 防止节点重叠
                    rankdir: "LR",
                    workerEnabled: false,
                    controlPoints: true,
                    // nodesep:"50"
                    nodesep: 20, // 可选
                    ranksep: 50, // 可选
                },
                // 节点不同状态下的样式集合
                nodeStateStyles: {
                    // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
                    hover: {
                        fill: "lightsteelblue",
                    },
                    // 鼠标点击节点，即 click 状态为 true 时的样式
                    click: {
                        stroke: "#3ad91e",
                        fill: "lightsteelblue",
                        lineWidth: 3,
                    },
                },
                plugins: [toolbar], // 配置 
                // 边不同状态下的样式集合
                edgeStateStyles: {
                    // 鼠标点击边，即 click 状态为 true 时的样式
                    click: {
                        stroke: "steelblue",
                    },
                },
                // 设置为true，启用 redo & undo 栈功能
                enabledStack: true,
            });
            // 加载数据
            graphObject.data(data);
            // 渲染
            graphObject.render();
            // 画布内容适应视口
            graphObject.fitView(20);
            this.graph = graphObject;
        },
        loadData() {
            /*
           let data = {
               "nodes": [
                   {
                       "id": "TMC2DM4EFDKYWdSvz4WH73QqhUDq7Tgop9",
                       "label": "TMC2DM4EFDKYWdSvz4WH73QqhUDq7Tgop9"
                   },
                   {
                       "id": "TBCbUDzc7RFTaqAvikENSfrmgEvthkb3S8",
                       "label": "TBCbUDzc7RFTaqAvikENSfrmgEvthkb3S8"
                   },
                   {
                       "id": "TBfUT28qQQarAZUyza3pHZ2XpWDSuLLT3A",
                       "label": "TBfUT28qQQarAZUyza3pHZ2XpWDSuLLT3A"
                   },
                   {
                       "id": "TBu6YpeqeQkVgVRAbFPPu2oABh5YFQ4Vpz",
                       "label": "TBu6YpeqeQkVgVRAbFPPu2oABh5YFQ4Vpz"
                   },
                   {
                       "id": "TCUg9KZ99QdcbsuebCwLY5tJNhh2wmCKyj",
                       "label": "TCUg9KZ99QdcbsuebCwLY5tJNhh2wmCKyj"
                   },
                   {
                       "id": "TCVzES1A1ukGW3FdkXDNwZ6jHNYiVjugwc",
                       "label": "TCVzES1A1ukGW3FdkXDNwZ6jHNYiVjugwc"
                   },
                   {
                       "id": "TMC2DM4EFDKYWdSvz4WH73QqhUDq7Tgop8",
                       "label": "TMC2DM4EFDKYWdSvz4WH73QqhUDq7Tgop8"
                   },
                   {
                       "id": "TMC2DM4EFDKYWdSvz4WH73QqhUDq7Tgo23",
                       "label": "TMC2DM4EFDKYWdSvz4WH73QqhUDq7Tgo23"
                   },
                   {
                       "id": "TMC2DM4EFDKYWdSvz4WH73QqhUDq7Tg338",
                       "label": "TMC2DM4EFDKYWdSvz4WH73QqhUDq7Tg338"
                   }
               ],
               "edges": [
                   {
                       "source": "TMC2DM4EFDKYWdSvz4WH73QqhUDq7Tgop9",
                       "target": "TBCbUDzc7RFTaqAvikENSfrmgEvthkb3S8",
                       "label": "交易1次，金额2535.0"
                   },
                   {
                       "source": "TMC2DM4EFDKYWdSvz4WH73QqhUDq7Tgop9",
                       "target": "TBfUT28qQQarAZUyza3pHZ2XpWDSuLLT3A",
                       "label": "交易4次，金额3000000.0"
                   },
                   {
                       "source": "TMC2DM4EFDKYWdSvz4WH73QqhUDq7Tgop9",
                       "target": "TBu6YpeqeQkVgVRAbFPPu2oABh5YFQ4Vpz",
                       "label": "交易1次，金额400000.0"
                   },
                   {
                       "source": "TMC2DM4EFDKYWdSvz4WH73QqhUDq7Tgop9",
                       "target": "TCUg9KZ99QdcbsuebCwLY5tJNhh2wmCKyj",
                       "label": "交易2次，金额985301.0"
                   },
                   {
                       "source": "TMC2DM4EFDKYWdSvz4WH73QqhUDq7Tgop9",
                       "target": "TCVzES1A1ukGW3FdkXDNwZ6jHNYiVjugwc",
                       "label": "交易1次，金额500000.0"
                   },
                   {
                       "source": "TMC2DM4EFDKYWdSvz4WH73QqhUDq7Tgop8",
                       "target": "TMC2DM4EFDKYWdSvz4WH73QqhUDq7Tgop9",
                       "label": "交易1次，金额500000.0"
                   },
                   {
                       "source": "TMC2DM4EFDKYWdSvz4WH73QqhUDq7Tgo23",
                       "target": "TMC2DM4EFDKYWdSvz4WH73QqhUDq7Tgop9",
                       "label": "交易1次，金额500000.0"
                   },
                   {
                       "source": "TMC2DM4EFDKYWdSvz4WH73QqhUDq7Tg338",
                       "target": "TMC2DM4EFDKYWdSvz4WH73QqhUDq7Tgop9",
                       "label": "交易1次，金额500000.0"
                   },

               ]
           }
           let source = [this.getRandomString(34), this.getRandomString(34), this.getRandomString(34)]
           let targets = {}
           let nodes = []
           for (const item of source) {
               targets[item] = []
               nodes.push({ id: item, label: item })
           }
           for (let index = 0; index < 30; index++) {
               let item = this.getRandomString(34)
               targets[source[Math.floor(Math.random() * 3)]].push(item)
               nodes.push({ id: item, label: item })
           }
           let edges = []
           for (const key in targets) {
               let item = targets[key]
               let len = item.length
               let slen = Math.floor(Math.random() * len + 1)
               for (let index = 0; index < slen; index++) {
                   edges.push({
                       "source": key,
                       "target": item[index],
                       "label": "交易1次，金额500000.0"
                   })
               }
               for (let index = slen; index < len; index++) {
                   edges.push({
                       "target": key,
                       "source": item[index],
                       "label": "交易1次，金额500000.0"
                   })
               }
           }
           data.edges.push(...edges)
           data.nodes.push(...nodes)
          */
            getRelationship(this.form)
                .then((res) => {
                    console.log(res.data);
                    this.graph.data(res.data);
                    this.graph.render();
                    this.graph.fitView();
                })

        },
        getRandomString(len) {
            let _charStr = 'abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789',
                min = 0,
                max = _charStr.length - 1,
                _str = '';                    //定义随机字符串 变量
            //判断是否指定长度，否则默认长度为15
            len = len || 15;
            //循环生成字符串
            for (var i = 0, index; i < len; i++) {
                index = (function (randomIndexFunc, i) {
                    return randomIndexFunc(min, max, i, randomIndexFunc);
                })(function (min, max, i, _self) {
                    let indexTemp = Math.floor(Math.random() * (max - min + 1) + min),
                        numStart = _charStr.length - 10;
                    if (i == 0 && indexTemp >= numStart) {
                        indexTemp = _self(min, max, i, _self);
                    }
                    return indexTemp;
                }, i);
                _str += _charStr[index];
            }
            return _str;
        }
    },

}
</script>

<style>

</style>
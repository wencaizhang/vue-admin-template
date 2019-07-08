
const columns = [
  {
    title: "名称",
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: "描述",
    dataIndex: "description"
  },

  {
    title: "容量(G)",
    dataIndex: "capacity"
  },
  {
    title: "状态",
    dataIndex: "status_zh"
  },
  {
    title: "卷名称",
    dataIndex: "volumeName"
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];

export default {
  namespaced: true,
  state: {

    columns,

    menuOptions: [
      { id: "multiDelete", visible: false, type: 'none', name: "批量删除" },
      { id: "detail",      visible: false, type: 'none', name: "详情" },

      { id: "create",      visible: false, type: 'single', name: "创建硬盘" },
      { id: "edit",        visible: false, type: 'single', name: "编辑硬盘快照" },
      { id: "delete",      visible: false, type: 'single', name: "删除硬盘快照" },
    ]
  },
  mutations: {
  },
  actions: {},
  getters: {}
};
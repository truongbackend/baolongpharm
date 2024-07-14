export default [
  { heading: 'Cài đặt' },
  {
    title: 'Cài đặt',
    icon: { icon: 'tabler-toggle-left' },
    children: [
      { title: 'Banner', to: 'forms-autocomplete' },
      { title: 'Hoá đơn', to: 'forms-autocomplete' },
      { title: 'Email', to: 'forms-autocomplete' },
    ],
    
  },
  {
    title: 'Người dùng',
    icon: { icon: 'tabler-users' },
    children: [
      { title: 'Danh sách mặc định', to: 'apps-user-list' },
      { title: 'Danh sách', to: 'admin-user-list' },
      { title: 'View', to: { name: 'apps-user-view-id', params: { id: 21 } } },
    ],
  },
]

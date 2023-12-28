// UserList.js
import React from 'react';
import { List, Datagrid, TextField, EmailField } from 'react-admin';

const UserList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      {/* Add more fields as needed */}
    </Datagrid>
  </List>
);

export default UserList;
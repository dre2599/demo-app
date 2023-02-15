import React, { useState } from "react";
import { CardDeletedContainer } from "../CardDeletedContainer/CardDeletedContainer";
import { CardsContainer } from "../CardsContainer/CardsContainer";
import {
  Input,
  Submit,
  Wrapper,
  InputWrap,
  Label,
  Containers,
} from "./UserForm.styled";

export interface User {
  id?: number | undefined;
  name: string | undefined;
  date: string | undefined;
  age: string | undefined;
  editing?: boolean;
}

export const UserForm = (props: any) => {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [deletedUsers, setDeletedUsers] = useState<User[]>([]);
  const [editedUsers, setEditedUsers] = useState<User>({
    name: "",
    date: "",
    age: "",
    id: undefined,
  });

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (name && date && age) {
      setUsers([
        ...users,
        { id: Date.now(), name: name, date: date, age: age },
      ]);
      resetFields();
    } else {
      alert("Insert missing fields");
    }
  }

  function deleteUser(id: number) {
    setUsers(users.filter((el: User) => el.id != id));
    //not null assertion '!' at the end
    let users_copy = [...users];
    let deleted_user: User = users_copy.find((el: User) => el.id == id)!;
    setDeletedUsers((current) => [
      ...current,
      {
        id: deleted_user.id,
        name: deleted_user.name,
        date: deleted_user.date,
        age: deleted_user.age,
        deleted: true,
      },
    ]);
  }

  function userReset(id: number) {
    setDeletedUsers(deletedUsers.filter((el: User) => el.id != id));
    let users_deleted_copy = [...deletedUsers];
    let resetted_user: User = users_deleted_copy.find(
      (el: User) => el.id == id
    )!;
    setUsers((current) => [
      ...current,
      {
        id: resetted_user.id,
        name: resetted_user.name,
        date: resetted_user.date,
        age: resetted_user.age,
        deleted: false,
      },
    ]);
  }

  function editUser(id: number) {
    let users_copy = [...users];
    let index: number = users_copy.findIndex((el: User) => el.id == id)!;
    users_copy[index].editing = true;
    setUsers([...users_copy]);
    setEditedUsers({
      name: users_copy[index].name,
      date: users_copy[index].date,
      age: users_copy[index].age,
      id: users_copy[index].id,
    });
  }

  function saveEditUser(id: number) {
    let users_copy = [...users];
    let edited_users_copy = { ...editedUsers };
    let index: number = users_copy.findIndex((el: User) => el.id == id)!;
    users_copy[index].editing = false;
    users_copy[index].name = edited_users_copy.name;
    users_copy[index].age = edited_users_copy.age;
    users_copy[index].date = edited_users_copy.date;
    setUsers([...users_copy]);
  }

  function cancelEdit(id: number) {
    let users_copy = [...users];
    let index: number = users_copy.findIndex((el: User) => el.id == id)!;
    users_copy[index].editing = false;
    setUsers([...users_copy]);
    setEditedUsers({
      name: users_copy[index].name,
      date: users_copy[index].date,
      age: users_copy[index].age,
      id: users_copy[index].id,
    });
  }

  function onChangeEditUser(e: any) {
    switch (e.target.id) {
      case "name":
        setEditedUsers({ ...editedUsers, name: e.target.value });
        break;
      case "age":
        setEditedUsers({ ...editedUsers, age: e.target.value });
        break;
      case "date":
        setEditedUsers({ ...editedUsers, date: e.target.value });
        break;

      default:
        break;
    }
  }

  function resetFields() {
    setName("");
    setDate("");
    setAge("");
  }

  return (
    <>
      <Wrapper>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Label>Name</Label>
          <InputWrap>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputWrap>{" "}
          <Label>Birth Date</Label>
          <InputWrap>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </InputWrap>
          <Label>Age</Label>
          <InputWrap>
            <Input
              type="string"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </InputWrap>
          <Submit type="submit" value="Add User" />
        </form>
      </Wrapper>
      <div style={{ display: "flex" }}>
        <CardsContainer
          users={users}
          editedUsers={editedUsers}
          handleDelete={(o: number) => deleteUser(o)}
          handleEdit={(o: number) => editUser(o)}
          handleSave={(o: number) => saveEditUser(o)}
          handleOnChangeEdit={(e: any) => onChangeEditUser(e)}
          handleCancelEdit={(o: number) => cancelEdit(o)}
        ></CardsContainer>
        <CardDeletedContainer
          deletedUsers={deletedUsers}
          handleReset={(o: number) => userReset(o)}
        ></CardDeletedContainer>
      </div>
    </>
  );
};

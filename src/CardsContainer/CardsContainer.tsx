import React from "react";
import { Card } from "../Card/Card";
import { User } from "../UserForm/UserForm";
import { CardsContainerWrapper, Label } from "./CardsContainer.styled";

interface Props {
  users: User[];
  handleDelete: (o: number) => void;
  handleEdit: (o: number) => void;
  handleSave: (o: number) => void;
  handleOnChangeEdit: (e: any) => void;
  handleCancelEdit: (e: any) => void;
  editedUsers?: User;
}

export const CardsContainer = (props: Props) => {
  return (
    <CardsContainerWrapper>
      <Label>ADDED</Label>
      {props.users.map((el: any) => (
        <Card
          key={el.id}
          users={props.users}
          id={el.id}
          name={el.name}
          date={el.date}
          age={el.age}
          deleted={el.deleted}
          editing={el.editing}
          handleDelete={() => props.handleDelete(el.id)}
          handleEdit={() => props.handleEdit(el.id)}
          handleSave={() => props.handleSave(el.id)}
          handleOnChangeEdit={(e) => props.handleOnChangeEdit(e)}
          handleCancelEdit={() => props.handleCancelEdit(el.id)}
          editedUsers={props.editedUsers}
        />
      ))}
    </CardsContainerWrapper>
  );
};

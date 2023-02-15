import React from "react";
import { User } from "../UserForm/UserForm";
import { Card } from "../Card/Card";
import { CardsContainerWrapper, Label } from "./CardDeletedContainer.styled";

interface Props {
  deletedUsers: User[];
  handleReset: (o: number) => void;
}

export const CardDeletedContainer = (props: Props) => {
  return (
    <CardsContainerWrapper>
      <Label>DELETED</Label>
      {props.deletedUsers.map((el: any) => (
        <Card
          deletedUsers={props.deletedUsers}
          id={el.id}
          key={el.id}
          name={el.name}
          date={el.date}
          age={el.age}
          deleted={el.deleted}
          handleReset={() => props.handleReset(el.id)}
        />
      ))}
    </CardsContainerWrapper>
  );
};

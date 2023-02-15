import React from "react";
import {
  CardWrapper,
  DeleteButton,
  EditButton,
  ResetButton,
  FlexWrapper,
  CancelButton,
  SaveButton,
} from "./Card.styled";
import { User } from "../UserForm/UserForm";

export interface Props {
  name: string | undefined;
  date: string | undefined;
  age: string | undefined;
  users?: User[];
  id: number;
  deleted: boolean;
  handleDelete?: (o: number) => void;
  handleReset?: (o: number) => void;
  handleEdit?: (o: number) => void;
  handleSave?: (o: number) => void;
  handleOnChangeEdit?: (e: any) => void;
  editedUsers?: User;
  deletedUsers?: User[];
  editing?: boolean;
  handleCancelEdit?: (o: number) => void;
}

export const Card = (props: Props) => {
  return (
    <>
      <CardWrapper>
        {!props.editing && (
          <FlexWrapper>
            <div>{props.name}</div>
            <div>{props.date}</div>
            <div>{props.age}</div>
          </FlexWrapper>
        )}
        {props.editing && (
          <FlexWrapper>
            <input
              type="text"
              id={"name"}
              value={props.editedUsers?.name}
              onChange={(e) => props.handleOnChangeEdit?.(e)}
            />
            <input
              type="date"
              id={"date"}
              value={props.editedUsers?.date}
              onChange={(e) => props.handleOnChangeEdit?.(e)}
            />
            <input
              type="text"
              id={"age"}
              value={props.editedUsers?.age}
              onChange={(e) => props.handleOnChangeEdit?.(e)}
            />
          </FlexWrapper>
        )}
        {!props.deleted && !props.editing && (
          <DeleteButton onClick={() => props.handleDelete?.(props.id)}>
            Delete
          </DeleteButton>
        )}
        {props.deleted && (
          <ResetButton onClick={() => props.handleReset?.(props.id)}>
            Reset
          </ResetButton>
        )}
        {!props.deleted && !props.editing && (
          <EditButton onClick={() => props.handleEdit?.(props.id)}>
            Edit
          </EditButton>
        )}
        {props.editing && (
          <CancelButton onClick={() => props.handleCancelEdit?.(props.id)}>
            Cancel
          </CancelButton>
        )}
        {props.editing && (
          <SaveButton onClick={() => props.handleSave?.(props.id)}>
            Save
          </SaveButton>
        )}
      </CardWrapper>
    </>
  );
};

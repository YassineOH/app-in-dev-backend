import { FormEvent } from "react";

// API RESPONSE
export interface ServiceResponse {
  _id: string;
  mainService: string;
  subService: string;
  date: string;
  createdAt: string;
  status: string;
  postedBy: MinClient;
}

// State
export interface UserState {
  name: string;
  email: string;
  token: string;
}

export interface ClientState {
  clientId: string;
  name: string;
  phoneNumber: string;
  city: string;
  address: string;
}

export interface ClientResponse {
  _id: string;
  name: string;
  phoneNumber: string;
  city: string;
  address: string;
}

export interface MinClient {
  _id: string;
  name: string;
}

export interface ServiceState {
  serviceId: string;
  mainService: string;
  subService: string;
  date: string;
  status: string;
  handledBy?: string;
  clientName: string;
  clientId: string;
  createdAt: string;
}

export interface UIState {
  textAlert: string;
  typeAlert: string;
  showAlert: boolean;
  showEdit: boolean;
  isLoading: boolean;
}

export interface TechnicianState {
  technicianId: string;
  firstName: string;
  lastName: string;
  city: string;
  phoneNumber: string;
  mainService: string;
}

export interface TechnicianResponse {
  _id: string;
  firstName: string;
  lastName: string;
  city: string;
  phoneNumber: string;
  mainService: string;
}

export interface SelectedModel {
  clientId: string;
  serviceId: string;
  technicianId: string;
}

// API Request

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterUserRequest {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
}

// API responses
export interface MsgResponse {
  msg: string;
}

export interface LoginResponse {
  email: string;
  token: string;
  name: string;
  role: string;
}

export interface Services {
  services: ServiceState[];
}

export interface Clients {
  clients: ClientState[];
}

// API FOLDER Return
export interface RegisterUserReturn {
  msg: string;
  type: string;
}

export interface LoginUserReturn {
  user?: LoginResponse;
  msg: string;
  type: string;
}

// Action Interfaces
export interface EditService {
  id: string;
  field: keyof ServiceState;
  value: string;
}

export interface ID {
  id: string;
}

// utils

export interface Link {
  to: string;
  text: string;
  icon: JSX.Element;
}

export interface CustomInputProps {
  name: string;
  type: string;
  value: string | number;
  handleChange(e: FormEvent): void;
  labelText?: string;
  disabled?: boolean;
}

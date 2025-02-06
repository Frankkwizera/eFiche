import { render, screen, fireEvent } from '@testing-library/react';
import PractitionerDashboard from '../pages/PractitionerDashboard';
import { BrowserRouter } from 'react-router-dom';

test('renders Practitioner Dashboard', () => {
  render(
    <BrowserRouter>
      <PractitionerDashboard />
    </BrowserRouter>
  );

  // Check if the dashboard title is rendered
  const titleElement = screen.getByText(/Practitioner Dashboard/i);
  expect(titleElement).toBeInTheDocument();
});

test('displays error message when fields are empty', () => {
  render(
    <BrowserRouter>
      <PractitionerDashboard />
    </BrowserRouter>
  );

  // Click the "Add Record" button without filling fields
  const addButton = screen.getByText(/Add Record/i);
  fireEvent.click(addButton);

  // Check if the error message is displayed
  const errorMessage = screen.getByText(/Please fill in all fields/i);
  expect(errorMessage).toBeInTheDocument();
});
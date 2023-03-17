import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from "./HomePage";
import {BrowserRouter as Router} from 'react-router-dom';
import '@testing-library/jest-dom'
describe("HomePage", () => {
    const mockUserProfile = {
      images: [
        {
          url: "https://example.com/profile.jpg",
        },
      ],
      display_name: "Test User",
    };
  
  
    const mockToken = "mock_token";
  
    beforeEach(() => {
      window.localStorage.setItem("token", mockToken);
    });
  
    afterEach(() => {
      window.localStorage.removeItem("token");
      jest.resetAllMocks();
    });
  
    it("renders home page with user profile", async () => {
      jest.spyOn(window, "fetch")
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockUserProfile),
        })
        
  
      render(
        <Router>
            <HomePage />
        </Router>
        );

      await waitFor(() =>
        expect(screen.getByText("Hi, Test User")).toBeInTheDocument()
      );
    });
});

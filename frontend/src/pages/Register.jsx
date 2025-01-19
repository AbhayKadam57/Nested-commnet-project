import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link, useNavigate, useRoutes } from "react-router";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [userDetails, setUserDetails] = useState({});
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser?.username) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/user/register", userDetails);

      if (res.status == 200) {
        toast({
          title: "Success",
          description: "User registered successfully...",
          variant: "success",
        });
        navigate("/login");
        setUserDetails({});
      }
    } catch (e) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: `${e.response.data.error.errorResponse.errmsg}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-gray-100 w-full min-h-[100vh] flex items-center justify-center">
      <Card className="min-w-[80vw] md:min-w-[30vw]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Register with us</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label>Username</Label>
                <Input
                  type="text"
                  name="username"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Email</Label>
                <Input
                  type="text"
                  name="email"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Create Password</Label>
                <Input
                  type="password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Button type="submit">Register</Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p>
            Already a membder{" "}
            <span>
              <Link className="underline" to="/login">
                Login
              </Link>
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;

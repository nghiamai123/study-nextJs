"use client";
import React, { useEffect, useState } from "react";
import Card from "./card";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/Loader";

export default function Users() {
  const [users, setUsers] = useState([{ id: "", email: "", password: "", username: "", phone: ""}]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchingData = async () => {
    try {
      const response = await fetch(
        "https://6670df540900b5f8724bd1b7.mockapi.io/users",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const id = setTimeout(() => setLoading(false), 1000);

      if (!response.ok) {
        throw new Error("Could not fetch users");
      }

      const data = await response.json();
      setUsers(data);

      return () => {clearTimeout(id);}
    } catch (error) {

      toast({
        title: "Error",
        description: "Could not fetch users",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchingData();
  }, [users]);

  return (
    loading ? <Loader /> :
    <div>
      <ul className="absolute left-96 grid grid-cols-3 gap-5 m-5">
        { users.map((user) => (
          <Card user={user} key={user.id}/>
        ))}
      </ul>
    </div>
  );
}

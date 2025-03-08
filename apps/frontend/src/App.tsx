import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import { add, sub, mul, div } from "@repo/utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

const formSchema = z.object({
  title: z.string().min(2).max(50),
});

function App() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/todos`);
      const data = await response.data;
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (title: string) => {
      const response = await axios.post(`${API_URL}/todos`, {
        title,
      });
      const data = await response.data;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    form.reset();
    mutation.mutate(values.title);
  }

  const x = Math.ceil(Math.random() * 10);
  const y = Math.ceil(Math.random() * 10);

  useEffect(() => {
    fetch(`${API_URL}/hello`)
      .then((response) => response.text())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    fetch(
      `${API_URL}/hello/${Math.floor(Math.random() * 10e16)
        .toString(16)
        .toUpperCase()}`,
    )
      .then((response) => response.text())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  });

  return (
    <div className="w-1/2 mx-auto py-4">
      <h1 className="text-2xl font-bold mb-2">Live Preview</h1>
      <ul>
        <li>
          x = {x}, y = {y}
        </li>
        <li>add = {add(x, y)}</li>
        <li>sub = {sub(x, y)}</li>
        <li>mul = {mul(x, y)}</li>
        <li>div = {div(x, y)}</li>
      </ul>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="title" {...field} className="w-60" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {data.map((todo: { id: number; title: string }) => (
            <p key={todo.id}>{todo.title}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

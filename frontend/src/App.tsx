import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const API_URL = import.meta.env.VITE_API_URL;

const formSchema = z.object({
  title: z.string().min(2).max(50),
});

function App() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

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
    </div>
  );
}

export default App;

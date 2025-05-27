'use client';

import {useSession} from "next-auth/react";
import {useForm} from "react-hook-form";
import {z} from 'zod';
import {updateProfileSchema} from "@/lib/validators";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {updateUserProfile} from "@/lib/actions/user.action";
import {toast} from "sonner";

const ProfileForm = () => {
    const {data: session, update} = useSession();
    const form = useForm<z.infer<typeof updateProfileSchema>>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            name: session?.user?.name ?? '',
            email: session?.user?.email ?? ''
        }
    });

    const onSubmit = async (values: z.infer<typeof updateProfileSchema>) => {
        const res = await updateUserProfile(values);

        if (!res.success) {
            return toast.error(res.message);
        }

        const newSession = {
            ...session,
            user: {
                ...session?.user,
                name: values.name
            }
        };

        await update(newSession);

        toast.success(res.message);
    }

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-5"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex flex-col gap-5">
                    <FormField
                        control={form.control}
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input
                                        disabled
                                        placeholder="Email"
                                        className='input-field'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        name="email"
                    />
                    <FormField
                        control={form.control}
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input
                                        placeholder="Name"
                                        className='input-field'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        name="name"
                    />

                </div>
                <Button
                    type="submit"
                    size="lg"
                    className="button col-span-2 w-full"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting ? 'Submitting...' : 'Update Profile'}
                </Button>
            </form>
        </Form>
    );
};

export default ProfileForm;
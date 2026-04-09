import React from 'react';
import { useForm } from 'react-hook-form';
import { ShippingFormInputs, shippingFormSchema } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';

interface ShippingFormProps {
  onSubmit: (data: ShippingFormInputs) => void;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ onSubmit }) => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
    } = useForm<ShippingFormInputs>({
        resolver: zodResolver(shippingFormSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            address: '',
            City: ''
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 max-w-md mx-auto p-4'>
            {/* Name Field */}
            <div className='flex flex-col gap-1'>
                <label htmlFor="name" className='text-sm text-gray-600 font-medium'>
                    Full Name
                </label>
                <input
                    type="text"
                    id="name"
                    placeholder='John Doe'
                    className={`border rounded-md p-2 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    {...register("name")}
                />
                {errors.name && (
                    <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>
                )}
            </div>

            {/* Email Field */}
            <div className='flex flex-col gap-1'>
                <label htmlFor="email" className='text-sm text-gray-600 font-medium'>
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    placeholder='your@email.com'
                    className={`border rounded-md p-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    {...register("email")}
                />
                {errors.email && (
                    <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>
                )}
            </div>

            {/* Phone Field */}
            <div className='flex flex-col gap-1'>
                <label htmlFor="phone" className='text-sm text-gray-600 font-medium'>
                    Phone Number
                </label>
                <input
                    type="tel"
                    id="phone"
                    placeholder='1234567890'
                    className={`border rounded-md p-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    {...register("phone")}
                />
                {errors.phone && (
                    <p className='text-red-500 text-xs mt-1'>{errors.phone.message}</p>
                )}
            </div>

            {/* Address Field */}
            <div className='flex flex-col gap-1'>
                <label htmlFor="address" className='text-sm text-gray-600 font-medium'>
                    Street Address
                </label>
                <input
                    type="text"
                    id="address"
                    placeholder='123 Main St'
                    className={`border rounded-md p-2 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                    {...register("address")}
                />
                {errors.address && (
                    <p className='text-red-500 text-xs mt-1'>{errors.address.message}</p>
                )}
            </div>

            {/* City Field */}
            <div className='flex flex-col gap-1'>
                <label htmlFor="city" className='text-sm text-gray-600 font-medium'>
                    City
                </label>
                <input
                    type="text"
                    id="city"
                    placeholder='New York'
                    className={`border rounded-md p-2 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                    {...register("City")}
                />
                {errors.City && (
                    <p className='text-red-500 text-xs mt-1'>{errors.City.message}</p>
                )}
            </div>

            <button 
                type="submit"
                className='bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors mt-2'
            >
                Continue to Payment
            </button>
        </form>
    );
};

export default ShippingForm;
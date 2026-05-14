'use client'

import { useForm, Controller } from 'react-hook-form'
import 'react-dadata/dist/react-dadata.css'
import { AddressSuggestions } from 'react-dadata'
import type { DaDataAddress, DaDataSuggestion } from 'react-dadata'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '../ui/field'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'

type OrderForm = {
  phone: string
  address: DaDataSuggestion<DaDataAddress>
  addressString?: string
  flat?: string
  comment?: string
}

export default function Order() {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<OrderForm>()

  const onSubmit = (data: OrderForm) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 px-4 w-1/2">
      <FieldSet>
        <FieldLegend>Ваш заказ</FieldLegend>
        <FieldDescription>Заполните все поля для доставки товаров</FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="phone">Телефон</FieldLabel>
            <Input type="tel" placeholder="+7 999 999 99 99" {...register('phone', { required: true })} />
          </Field>
          <Field>
            <FieldLabel htmlFor="address">Адрес</FieldLabel>
            <Controller
              control={control}
              name="address"
              rules={{ required: 'Адрес обязателен' }}
              render={({ field }) => (
                <AddressSuggestions
                  token={process.env.NEXT_PUBLIC_DADATA_API_KEY || ''}
                  value={field.value}
                  onChange={(suggestion) => {
                    field.onChange(suggestion)
                    if (suggestion) {
                      setValue('addressString', suggestion.value)
                    }
                  }}
                  inputProps={{
                    className:
                      'h-14 w-full min-w-0 rounded-md border border-input bg-sidebar text-base px-2 py-0.5 transition-colors outline-none placeholder:text-muted-foreground/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
                  }}
                />
              )}
            />
            <FieldError>{errors.address?.message}</FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="flat">Номер квартиры</FieldLabel>
            <Input type="text" placeholder="Введите номер квартиры" {...register('flat', { required: true })} />
          </Field>
          <Field>
            <FieldLabel htmlFor="flat">Комментарий курьеру</FieldLabel>
            <Textarea
              placeholder="Укажите код от домофона, этаж или другую информацию, которая поможет курьеру вас найти"
              className="resize-none"
            />
          </Field>
        </FieldGroup>
      </FieldSet>
      <Button size="lg" type="submit">
        Создать заказ
      </Button>
    </form>
  )
}

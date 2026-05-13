'use client'

interface ProductDescriptionProps {
  sku: string | null
  composition: string | null
  sizeOnModel: string | null
  heightOnModel: string | null
  country: string | null
  description: string | null
  delivery: string | null
  refund: string | null
  care: string | null
}

export default function ProductDescription({
  sku,
  composition,
  sizeOnModel,
  heightOnModel,
  country,
  description,
  delivery,
  refund,
  care,
}: ProductDescriptionProps) {
  return (
    <div className="flex flex-col gap-4 px-2">
      <div className="md:w-2xl">
        <p className="text-sm text-muted-foreground">Артикул</p>
        <span>{sku}</span>
      </div>
      <div className="md:w-2xl">
        <p className="text-sm text-muted-foreground">Описание</p>
        <span>{description}</span>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Уход за изделием</p>
        <span>{care}</span>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Материал</p>
        <span>{composition}</span>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Размер на модели</p>
        <span>{sizeOnModel}</span>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Рост модели</p>
        <span>{heightOnModel}</span>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Страна изготовления</p>
        <span>{country}</span>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Доставка</p>
        <span>{delivery}</span>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Возврат</p>
        <span>{refund}</span>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Уход</p>
        <span>{care}</span>
      </div>
    </div>
  )
}

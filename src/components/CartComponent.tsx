import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

interface CartItem {
  id: string
  course: {
    id: string
    title: string
    description: string
    price: number
    imageUrl?: string
  }
}

interface Cart {
  id: string
  items: CartItem[]
}

export function CartComponent() {
  const [cart, setCart] = useState<Cart | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchCart()
    }
  }, [user])

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart')
      if (response.ok) {
        const data = await response.json()
        setCart(data)
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
    }
  }

  const calculateTotal = () => {
    if (!cart?.items) return 0
    return cart.items.reduce((total, item) => total + item.course.price, 0)
  }

  if (!user) {
    return (
      <Card className="p-4">
        <p>Please log in to view your cart</p>
      </Card>
    )
  }

  return (
    <Card className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {(!cart?.items || cart.items.length === 0) ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.items.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{item.course.title}</h3>
                  <p className="text-sm text-gray-500">{item.course.description}</p>
                </div>
                <div className="text-lg font-semibold">
                  ${item.course.price.toFixed(2)}
                </div>
              </div>
            </Card>
          ))}
          <div className="flex justify-between items-center pt-4 border-t">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-xl font-bold">${calculateTotal().toFixed(2)}</span>
          </div>
          <Button className="w-full">Proceed to Checkout</Button>
        </div>
      )}
    </Card>
  )
}
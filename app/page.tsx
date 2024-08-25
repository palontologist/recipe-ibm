"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export default function Component() {
  const [ingredients, setIngredients] = useState<string[]>([])
  const [currentIngredient, setCurrentIngredient] = useState("")
  const [dietaryRestrictions, setDietaryRestrictions] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
  })
  const [generatedRecipe, setGeneratedRecipe] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const addIngredient = () => {
    if (currentIngredient && !ingredients.includes(currentIngredient)) {
      setIngredients([...ingredients, currentIngredient])
      setCurrentIngredient("")
    }
  }

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((item) => item !== ingredient))
  }

  const handleDietaryRestrictionChange = (restriction: keyof typeof dietaryRestrictions) => {
    setDietaryRestrictions((prev) => ({ ...prev, [restriction]: !prev[restriction] }))
  }

  const generateRecipe = () => {
    setIsGenerating(true)
    // Simulating AI generation process
    setTimeout(() => {
      const recipe = simulateAIRecipeGeneration(ingredients, dietaryRestrictions)
      setGeneratedRecipe(recipe)
      setIsGenerating(false)
    }, 2000)
  }

  const simulateAIRecipeGeneration = (ingredients: string[], restrictions: typeof dietaryRestrictions) => {
    const recipeName = `${ingredients[0].charAt(0).toUpperCase() + ingredients[0].slice(1)} Delight`
    let recipe = `Recipe: ${recipeName}\n\n`
    recipe += "Ingredients:\n"
    ingredients.forEach((ingredient) => {
      recipe += `- ${ingredient}\n`
    })
    recipe += "\nInstructions:\n"
    recipe += "1. Preheat the oven to 350°F (175°C).\n"
    recipe += `2. In a large bowl, combine ${ingredients[0]} and ${ingredients[1]}.\n`
    recipe += `3. Add the remaining ingredients and mix well.\n`
    recipe += "4. Transfer the mixture to a baking dish.\n"
    recipe += "5. Bake for 25-30 minutes or until golden brown.\n"
    recipe += "6. Let it cool for 5 minutes before serving.\n"

    if (restrictions.vegetarian) recipe += "\nNote: This recipe is vegetarian-friendly.\n"
    if (restrictions.vegan) recipe += "\nNote: This recipe is vegan-friendly.\n"
    if (restrictions.glutenFree) recipe += "\nNote: This recipe is gluten-free.\n"
    if (restrictions.dairyFree) recipe += "\nNote: This recipe is dairy-free.\n"

    return recipe
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Recipe Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 mb-2">
                <Input
                  value={currentIngredient}
                  onChange={(e) => setCurrentIngredient(e.target.value)}
                  placeholder="Enter an ingredient"
                />
                <Button onClick={addIngredient}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="bg-primary text-primary-foreground px-2 py-1 rounded flex items-center"
                  >
                    {ingredient}
                    <button
                      onClick={() => removeIngredient(ingredient)}
                      className="ml-2 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Dietary Restrictions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(dietaryRestrictions).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={value}
                      onCheckedChange={() => handleDietaryRestrictionChange(key as keyof typeof dietaryRestrictions)}
                    />
                    <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button className="mt-4" onClick={generateRecipe} disabled={isGenerating || ingredients.length === 0}>
            {isGenerating ? "Generating..." : "Generate Recipe"}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Generated Recipe</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap">{generatedRecipe}</pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
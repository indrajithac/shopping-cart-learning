var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let products = [
    {
      name: "Shirt 1",
      category: "Men",
      description: "goood shirt",
      image: "data:image/jpeg;base64,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"
    },
    {
      name: "Shirt 2",
      category: "Men",
      description: "average shirt",
      image: "data:image/jpeg;base64,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"
    },
    {
      name: "Shirt 3",
      category: "Men",
      description: "premium quality",
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFBgUFBQZGRgaGhgaGhsZGxgYGhsaGhgaGhkaGhgbIS0kGx0qIRgYJjclKi4xNDQ0GiM6PzozPi0zNDEBCwsLEA8QGhISGjMhISE0MTMxMzMzMzEzMzEzMzMzMTEzMzMzMzMxMTMxMzMzMzMzMzM+MzEzPjE+MzMzPjMxM//AABEIAQ0AuwMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAgMEBQYHAQj/xABDEAACAQIDBQYDBAkCBQUBAAABAgMAEQQSIQUiMUFRBhNhcYGRBzKhQlKxwRQjYnKCksLR4RWyJGOi8PEzQ3OT0lP/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIEA//EACARAQEAAwADAAMBAQAAAAAAAAABAgMREiExIjJBUQT/2gAMAwEAAhEDEQA/ANmoUKFAKFChQChQojMBqTYeNAasU7Y7a77azwZwyImQCxFnXVhcjXnqOlazjNqIgIBBPuK87YPPJtQM4IZ3kYBswNir5bhteFjWc5+N61hfyiTxSy4Zs0ZOU8uXpXY+08o61Z5sGJY/EVTtobNK3sCK5MbP67MpYSxm3pGvx9Tp7CoaXFMxuxufpRcUhBosWFLDM5stwpW9nJJAsFte+t/IV7449eGeVgkkhYEDpc+XnV27CSHCyxYg7uZlUg6WjN116cSaitl7IC78npHoLgEle8txYX+lTiRtI2RRdiP5VHEn3tXvjhyPHLLrd1YEAg3B1BFHrPNh46TDosaOWRdAj66dAeVWzC7cRrBwUJ66j3pYiXoURXBFwQR1Goo9QChQoUAoUKFAKFChQChQptjcUsalm9BzJ6Cgc0xxW0449C1z0XU/4qvYjaEsnE5F+6unueJpuqW4VqYp1LT7cc6IgHixufYVET53N3YsfE/gOVKKDzrtq1xOmEDlGKtpcHITwzWNrnztWc9jtmt3rySjK8EpCm5IYHMrIo5KNWDDiRatQm4by5l+o8qqO3Y5Ua8cZeM/+5GAXRrnRhzGp004m3SpnOxrC8vU/HhxnfKbqwDi3DXj9RURtDZ2YnQ0z2N2hbDEfpEL9yd0yKuYKw+0RxU9QQPLS9XPHY2GLDPjMyvEqZwVIs99FVT1JIFvGuDLVlK7cduNjLtsQpArOyZnXVVPC/EFuvLSijCrHIzlzLJ8uc20AFgABoNKSmxckyiaUb0jBgo4BCdxRfjpzPWp3YnYosBJNJlU6hF1vfm7aZia7MMfGSRyZ5+V6bYDCPKQE4E2L8VXqeO95Crds3ApEuVAST8zEak9SffTxp7h8FGgCqdFFhYW0pyYR4n1NejBHKvBiK6pA+UEj2H1pUIByrlaHIsRIhvGxXwB0PmOFTOG2+RYSr/Ev9qh8tcK1mzqdXSGVXUMpuDwNK1SMNiniIKNYc1Oqn0/tU3s7b6yuIypViOPFb66A9dCaxceL1OUKFCooUKFCg5VR2tjM+JKD5UXL/Fe7H8B6VapnyqzdAT7Cs7wM5aTMftE39da1iJQPyNdtQdAaIpIr0QcNXb0BY10LQdFISYQXLRtkc8dLo37yc/xpwBQoIxSgbLIoRzoVOqSfung3rqKo/aidGnOChNsMj55wDdM4IJyacRfLYH5iel60THkCN2YAhUdt4ZgCFJuR4WFVXsjhYljYRRuXZ2ztJck2ZiGBItlykHQXJvfWsX7IQjsDYZkbv5Fsg0jS1jp0HIcqtyYYnVvIKOQ8aWQaDyo1UBVA0Aopo1cNaBDXKMRRWa1AK5QVeZpvicXbdQXNAeZwNOZ+niaa94ykFdGBzA+PKjLHl1Y3Y/MT0oqm9j1P0rIvWzMYJYkkGmYajoRow9CDTyqr2MxFjNAfsPnX919fxq1V51QoUKFAw2zKUw8rAXIRz9DWeYNwhBbw/tV87SSZcLJbmAv8zBT9DVBjUF8rcGUitYiSwuMvIY256qfEcQfcU/YVUoVeOTKx1Q3BPMdfKrTBOGF63EGUUoKI1dFUHBoEiiGuGgZ7ZxNoJCq590jKbAG9hYk6c6bdm8OY8OLizMWZlzFsp03Mx+a1uWlG7QKgw0neWCMMjEkgDMQBqPGu7BhWLCRRq2cBW3+Oa7sSbgnmbelT+iVy8qFq4TQBqgwoprt64TQFauAczQY0jIxOgoCTylt1feuJGsa5jx6mjgKgJPrVex+1Q7hRqoudOFhWRITS52tyuAfxt+FO8ToVFRmC3il+Zv+dSeL+ZaBxsp8mLjfgHBjfxzC6f8AUAPWr1WeM+UhvusGHmDer9DJmUMOBAPuL1nKEK0KFCsqrHbmbLAq/ekX6Kx/IVUZgd1hysas3xBv3cIHOQ/7DVcaVQMpIrWIQx6XAkHLRuuU8af4VAvyE2qPEvnbhanWCk0tfhp7VpEskh50qGpoj0qprQXvQFJ5q6Faghu2s2TBOSARmjBDC6kF1uCvMeFOdi5RhoAhzJkTKwUopVmuCEOqje4Gmvax3WFBkzq0ih7BXKLlY5whBD2IAsQRqKcbLEZijSMNkRECkm+6CoW55m1qz33xOeupUvXC/Oi5PGkMfhu9hkjDhTIjoGIzAFlIuV58eFFOFxKH7afzL/euhwdAQfK3HpoaqMnZI6EJhjlsEv8ApACrbfAVJALs2vDQaWruH2DKqOjxQZXOa8cmIFzlyknvHchrBACCLa0FsY9aQeULrVS/0zEIVtHMlgqnu8TdFABBIGVSW0BJ4ksSajklxiFQTibFwD3scL7vNi6qTblxHGnRN7exrNuKbA8ah9nxFnyrr/YcfyobTlBkax0GlPeyQzF3va1h76n8BQWXAYbLvNxpZ0LG9QG3O2MGHug35PuJrbzPKojBS4/GnMEaNORN0FvxNXotmNJAq39lMaJcKhB1W6N4FTb8LH1rMdq54VWMzZ2Nyx+6Ol6nvhdi272aK+4VVx0zA5Tbxtb2rORGl0KFCsKpXbwyM0aRrchWbXhckD30+tUCcOhIkVgfG/0NaH29x7w9zIi5spbOOZQ5QbeXGoiKeLFR50s6niPtqf2hxFbxRAbOxRJsSDTXslj+8WQXuVmkv/E5YH6n2p9tHZOQF47kC/mPPpURsZlSRigADhc1uGYXF/UaelWwXNHpZXphC+lLJJQp4ZDyFFyOeLWFJCW1FYs3+K0IztWVWC6u4Gdc7ouZ1T7RCm+lSmzHVoYihOVkjYX4kMFYE+Jveo7tBmjhDBHe7qrIhYOyNoQAurDqvOpHCNaONMuUKiKFsAVCqoCsBoCLWt4VkPWotcvXGNADakXNBnpF20oEpXPJiPWobHYlxwf3p1icSRwqF2g9xmGqk62+yeh8KtSI3HSHKz8+f96a4THTGHu8OPmbfYfMxtYKvQDr404mYag8CCD6ipj4dYWMQBzqwZx4aMdfa1YipDsr2VSECSUB5DrrqFv58T41Ibc28IxkjIzczyX/ADR9tbTKKEjF3fQAC5HjYVHYDsyz781xfXLxPrWqK2iSzyWQEljqxq17AxSYTGYeIEWN0c/tOLD6ge9PMee5jyYaPNI26oUDTqzHlYdahtl7BEeJw8mMlUFpVKqDe7g5lu3PeC1ODZ6FChWFU7tfjVWaKNxusr62zZr/AGCBr9kEdbGqUNjMjnEYGRb33lHytbirjl01qz/EPDRyOgdmQhDvi+VQWGjsNF1AIvzF7i1VcbInAEkcuZxosmcK5HId6NH0ucrhhrxFbiJnZ20FmBBHdyIP1iE8P2h1XxqJxuKwbSDI65y6rdRYMb2sbaetRe2NuOImixOHZJWFu8C5DkIObQbr8vkJ4cBpVaUYSMh++kmyFSqjLCoYa7xa7aHoOVW0X+K5zSMbKug8aPHis3yimuUzMAP/AE116ZiedSYRVFgKRRocWB86+tP48Sp4VHhb11MMeRtREhI5A/CkVYVyM2B7zgASKZYeYShijXVSBp73B+vlTyneHLzp3LibaCkg7cTSqYcCg6ngBQEEopliJGB1/wAU9fC6X50i6ZhlPHxoIzEjTMOH4VHPdLsNVOjDqKkXJjaxF0PGkcRhtMw1Q8D086Cu7USynL5jypx2R2kkGHYytlDSMU8dbH6022mbKQDfkPWrH2o2diNmtG+HUfozohkDrniR91WD3vkDM62PielZ6GzduIomLKucnhwzeQNKt2ox0gzJg8ingzsVJ8gReneGdlCyYeDZwLKrFs+UqxF2FsvI6XvrS/8ArrJripMJ+7DKzufJLXrQr77bxym/cG/7N/zGtKyYmeZkbGYKQKvyurKtrkG5JPUXqQn7SCVCYIprIQWeNTntwsA6k28QKh5ZY3W7ROhJ1fFRYnEkj95yEHoBUG4bElZ8PE7m7Mim4N7gi4N+pFjUhVU+HuLSTBgRk5I3ZEvpui1tPsjU2HIWq11iqzbtpgpBOzrM8ZaxRxcBDlAF+ToToVOovcVDmPEqoMz4STqJUaIhuYzpmB8/WnPxO21IMUsMYW0ULysr2KyBtCrJcZlAXgarOE7TYhW7tRHlVQWjcPkytYjfa7KozW3r2tYG1alExtLEQvHlWMGx3srsyA9VPP2FU+fCx3OUC/VrE8KlMTtpCrN+i92itZ2jKMCRY2spBIIINyOBqM2n2oDjLh4FC2vndRfoSFAsB/alF42K7Nh0AG9lAPhyp0MORre5qF7IYsmBHLXvmBPC9mI4VakdONq1A2gw7HlTh3Cbq7zfSus7vou6PDjRwqxi/OtIJ3At+s1J5eFEiwaRqFjWwuCRxuepvxNFRiWLN00pe2tTidALRwluNcYUjI9VSWJxIHCmLyMxuRpTtYL6mlGj9qBo+VhvCoTHSJGSqMSD8y8h4ipXGuBoo05moeaAWJ0qUQ4gzzQx8Q80SfzyKv51tvbCBpMFOiKGZkIsQDz1IzAi4FyPGsl7PYfPj8Kn/NVv/rBk/ord686rCez64TCl4yFZ2sLyxhe7/esTnN/tCwqabZjSari0tyEKKgHsT+FO+0mGlGJcZY1jLWCOhZSD9pSQV3uJAGhvUfEMApyyJhmfnkhjS3XeCg39a3PiGmO7O4kjdxcpHEhmP5U3h7MPYvNO4UC7G5OnmTTqTbGz4WJjcu33BLIygjlbMbeQpnPt4yAhszKeQR7W6ZiPzoLX8LNoxvLiYogyxoIyuY3Lkl8z+fy6eIrS6zL4bY9XxEiCLuVWP9Wum/dhnY21uLJ/Ma0ysVWLfE6GM7RLSFcqxwMbjetnZRZibZSTcjonjVahwz4hJZJJFUAPaUC/eZHJIF20UaLz0IFWj4m43udpCRkJj7lULAA2ZybAjmNw6eJqmxSALlkLWkYM4RCUjtvoixiwDMRvLyAHGrA3xkUeQSxssV0RnQPq+dipVFB+VQLkNY6+NMcUuY3syEDKQSABGAuWyj9m9+rE86lttTHENM4EbrGUZZFABNl0TObFoyMwtqcyrwvrHTSRhV3GB3SxGYoFeJTkN7D5iWt41KLt2Tv+iJfQ5nOnD5z9KssD9arXZE/8HH/GP+o1OppWpRJiTTSioL8abq9d721bQ6lGl6ICeNFSUNfXgL0kmJuSByNuB/Os998Tnrp6r30NFaPpSQeh3laUbhxptNLQd6auDWQ2xGtM8RHYedPXFNpqA/YqHNtOHTVFkfy3GX+v61s1ZL8PEvtFj92F/q0da1WKrOPiVDiY5IsRFeSJgIniNhZiWKuhPBje2v3RVUlmkKWnwECi1zJiXVLgaXKrmJ+lal26gV9nYoODlELtpxBQZ1I8ioPpWA4bERiPeCOxaMsjs5ZkYKu5c8MzE2vcW4WN6sot2zTFa4xMSKdAMLh2Vb6CxlkDDmOXMdaUxWx5GUuMSjoBqGi7xv8ApbX2FVvD92ivDKpREkUO9t+RC2cBgAWU2ROBuL68DSmFxUbRs/fuhhdghQjOsdlszIxu+hIuQACtVFh7Ivh49o4bukzSuXR2yNEqqUY2CE6ndvfwra6807N7Uz4YpiBvsjOVabO5dWuBxO5ukjTp0r0RsrGd9BFMVK94iPY8syg2+tYqqZ292PDPOneqT+rI0Nr3LC58Rc2PK9QA7JxrrHPMpDF1uUYK5UqXAyg3ykjUmrd2qP8AxKfuf1Gma1zZZ5TK8rrwwxuM7FBxPYuRUWOKVMqtmvYxsxF7ZvnBIva/hURjdld2QskMmU5VYJKuVjwzM2Qn2A0rSsSar20RneOP78iL/M4H51cdmVTLXjxIPsUYM/ooIIUZgQD9rUjeJJNHiUjU1N9q5MuJbczHIpHtVcfFMTvKQK645T1Na7eiYaVZN0Gx6cKfRYO2pNaiGrYe6G+gYW04601wiLCoQXbW5JAF/IDh/wCakMRIPlpF8p5U5O9O3nBRir+FGJuNKbPD0pESMhvxqB0VbpRHa3GnEWI7wWRgD40X/S3PF6Bg7+NFEZILnRFGpP5VIvhYYhmkcEjl/ioPH484ghFUrGDwH2vPwpRMfDB74yY24xgjyz1q1ZJ8Nb/6hJb5REwPnmS351rdeao3tDEr4TEI5srQyqx6BkYE+xrA8Oq92D3bsEV1LAAtHIljG19CLrmcnW2ceu0fEME7NxIBIJQAWvfVlFtOvD1rLE7OY+SMpI0ah3DkByH5Aq2UFToBobDr4Tyk+tTG34iu5ZMMrMxkmzRvCEOffsrKpXg5AJzX1GtRm3ljaUFQocMsbQpe7FlLu5ey65jlIt61ao9h4mBw7RbkYvG0Lh+7bKRIzI2UuXub24X04VUMTiJLrJOgL53G+qhgHzXz6AsVK3FxbeNXyl+VLjZ9hNIGklRWzEO6FlYgakrmAXkNbAdK9Sxx5QFHAAAegtXmfsphlnx+Fj1YNMrHXkpLk+ymvTtEUrtY1sUn7n9VNQ2lOe2q2nibqjD2YH86Yre1cmz9q7df6Q1xTVEYJe8x2FT/AJqN/Ie8/pqRxzWFI9iIO82irco43f8AiNkH0ZquudqbLzFP9oIi872+a+75qB+RqPGGLjUW6062/icsjvlLKHurJxVhoQw42OutMF2kXF1412xxDNsZTzI8RyrogMegcsT1qOlkxDmy6URNnYkG4kF+h4VRINDbebjSbEcutDDTuzd1IpR+I5hhzKmlsi3tYX6+FB1IWPLSlRg+tHjem2N2jkFl40Al2QpN1YqaK+IMYytIGP4VDyNPJ9uw9qPDsK+sjmgcJsiOTeMudjqddPKjzYORQQia2strWueZpE7DjHys4PLWnMiNhYzJNOxHBI+bHle/IUE/2C2asLOl8zhAznxdj9N01eazT4ZYhpMTipWa5ZY79AQW4elq0usVUbt6TLh5D+zYebEKPqaqUIqx9qntCFv8zqPa5/IVXl4Vzbb746dM9Wm+MbSqxtpbxkZQzMQouLm5NhVh2k+lqh4Ie8xmGi6yK58kOb+mvPH7Htn+q99nuxWEwhSRUzzILCVrZtVykgDRbgkadas9Cu12OBUe3Mf/AKL9GZfdb/01FLfLVi7ZIThwQPldCfAG6/1Cq6h3K5tk/J2ab+KJ2kdKlfhdhrtiZjzZUHoCx/3CoTa7aHyq5fDfDZMAjHjIzyHyLEIfVFQ1rVPfWN19IWPFAyvE4s2Z7X4OAxFx42prjcH3bCRRp9ry60Vj3gOY2bOzKw4qSSbg+tPcDjc945BZ10YcmHUeBrrjlJYd+Y505El+FJYpDGQQNzw5Uc20YfKRcGgLKhPD5uR6daabO2Y0Rd5JAzORYDUKBfW5562ta1hT6I2a5pV7W04mlxlsp28sMMY+VdOJ4Uzi2eW3nOpqXGBBYMxvbgOlLZVXUm1aQziwXQUt+i+NFl2ii8Deo+XGySbq6DrRTvEzrF8il3PADl5nkKhm2c0j95O2dz8qjREHgKfR4Mg3Dtfn412aZlB+9bU9KzRO/D9I1bEJGBZDGhPU5STV2qgfDJLHEjlmS56sQSfxq/1iqrXa9tIl/aY+wt+dQ6kVJdqWvLGOisfcj+1Rkh3a5Nl7lXZpn4ojHya+ApX4fYUyYySY/LEmUdMz6fgDUTtrFZVbrV97A7M7nCIxG/Ke8b1+Ueige5q6se3puy5jxaaFChXS40N2oQnCyW5ZW9FdWP0BqqIdyrnt4f8ADTf/ABv+Bqkxt+r0rw2fXTpvqq/t+WyMfA1puDXuMAg//nh149Vj/uKy7bgupHUge+laD2sxjpHDGAMkjCOVjpkVkbIb8ruFX1rWpnd/FQgbKoHT+1GxeHLASId9eBH4UEizLcfMu648uduvhTYSPGcy7yHiOldLwqQwO1swySLvDTzo8WLjVsmoUm9j9k+HhTR1jlsynKw96VDkjJINeTDn/miH8rKgB43pJsUBrTBwy2jOq3urfiD461zv1BAyliDragXfGyv8g060icLI2rMaeRysRe2UdKK+KA860EUwHMmnSIFHCmrY2iJiix8BxrIdO9NJ+B5DmfDjTnDqXuQunUn61G4nGxnPJJIEw0R325ySDgiDi3pSh12FmkXaJjVsqNGxdT9o6FP4hf2vWrXrC+zqu8rbRxiy4eGJmkTIMruxOW4592iXuOBBtrW1YLEiRbjiNCOh/wC7H1rzVWdvPfEt+yij1NyfxFReNey+lOMTNnlkfq7W8l3R9FFV/buLsCAa48/eTu1zmMR2FwxxeMjgHys12I5Ioux+lvUVtUaAAKBYAAAeA4Vn/wALdm6SYphq36tT4A3c+9h/DWh10a8eRy7cu5O0KFCvR5kZ48yMp5gj3FZ1hTuZTyuPbStJrNyWSWRSNQ7dPvGvHbPUdH/P9sQ+PiuyKeHeR/7wK0jaUYLFSAVKBWUgEEG9wQdCPOqLjsMTvrqVYMOl1IIH0qWHbvBPinw7yCMjIEkJ/VyFo1YjPwVlJK71hpxvpV1fE3z3DLbmwe5jlxWGldGjRnMbfrI2CgnKMxDoNeAYjwFV/YuJxs+HGJOFWSNy2XuSA24SGzRu1zqDbKSfCtC21h8+FnA1DRSAEcDuk6Hhyqt/CaQnZSD7sko9C1/6jXv14K1Nt6CJ8s8csRsCM8bxv/K419KkMPtGGQZo5Sw/dJt4XANaLM6ZCJApT7QcAp4XB042rMtkdl4sZNtBWd4kjxUiokVkVSrsActsvADS1PIOZ8WQhyXcgXAItry42omAxJy55mVXYk5QRoNbXHj4dKWT4fzhtMcAmuvdktfkCC7C3U6UhsvZBgxcWCxaJIJN/vFLjvFCsbDUFSCOGlTvvq/zh1/qcTEI0gW/DXj4Xpw+Eitm7xQOrMqj3Jqcx3YzZ8iMn6IFvbeUlWFj97MSOdQW3+weCTA4gwYcCRI2dGJZmum+QNeJCketa8meI2TEYUMFfEx6m1g4Yk9ABc+1S0MRbdjw0z2Nrsvcrw0N5LMV8VVqS+DUqtgHyqodJ2UkCzFWVGW5HEasNelXog8Afb/vWnkqqSbAxc693JKmGjI1SAF5D1HevYa9QlLbN7LYPC5cked14NIxkcdSAflJv9kKDU8jo4ujB1uRdWut1JVhu6XDAgjqDTeYWFhp5aVkQ+1Jb3sPG5seHDKvAeZufKnHZLaZVMRc3yqCP3wWXieJKmKme0WCRs5F7nKvn+Q6k6DnpVb7PdpIC8kZLIC4PeG/dsbAbzfYBIXjYaDgdKxfU63jJbxZBuJqdTxqmbbmLPlXUk2A6kmwA96se2MTYHXQcLfj5VFdicD+k45CdVjvI3Td0UfzEe1c2M7k68744tZ2Hs8YfDxwj7CgE9Wtdj6kmpKhQrrcIUKFCg5VA20mXFy24HKfUqpNX+s77U4kJiZCeG4D4bijX6V57Pj20fsTlIyHrWLY8gyPYaZ3/wBxvWybQ3oCyjUA+ulYoWvfzPvfWmEXdfiT2Zt3FYdSsOIdUYFSl8yEEWIyNcDQnharF2J7efoMP6NJhzJHnL51cB1zAXGQizajqKpBroFejwbrs34gbOmsDL3RI+WZSo8i2qk+RpjsIqu1cZ3cissirKuRg6Or2Lm4vvK+b0NYufGnWzdovh2zxEgkEbrFTqOTLqOXtQejMr5lKlQgzZwQSx4ZchBsLEG9xreqx21OTE4CUaMrkDyzKfXnWdbP+IO0IwAZFe3N1Qn3ABPqaU2p29knCyShRLESY1VSFJNrs+tiOOnlQbfjYnYMsb5GuCGtm0DAsLHqLj1ruJw3eI8YJXOjJmFrrmUjML89axGT4r7RblAPKM//AKpnN8RNqOb/AKTk8FSMfUqT9aot3wbcxz47Bk8CCOpKOyEj0NadhsGIo1RbqkahVLEk2UWBZm4nxJrzHHjphI0qzOrvfO6MyM2Y3NyttDSc2aQ5ndnPV2LH3NB6LxO2MDh1ytiIIxdjlVlO8xLMcq31LEk+Jqvt24gmk7nBxyYl7E6fq0UAgFmdgbLrxCmsVTDZmVEW7sQqgc2Y2A9zW0dn9kpgoREgGdgDK/Nm6X+6OQrGWXHprw8qGP2Y8oIxUxKkEGKAZI9dNXa7yHhxIHhbSqbtaOTAwtCYwY5DuzD5ip/9t/EaHx1q8YifQnieVRmPcOrCQBlI1B4f+a8vOyujLVLizfAbZksIGLvEzAWQZnAJ1CA8TbgDWqfDKVIJHiZGzzZSrEAZVUEhHF7hrknpwqh7HwbQTjFYeRRLEW3XF7I27nUfa3WYWve5Fal2FwGeR8Sw6733pHN3YeA4V6yT65srZ6q+0KFCtMBQoUKDlZht0ZsTOON2IN/ICtPrLe004w+KnMtwhBkBH2ltew8b6edYznY9tF5kR2Ljh3ZQ62JQ343U6X9LVmfanZv6PiXUfI93TybivmDUj2W26xxLiQ2EzXF/lVwN0eRAC38BUv8AE2NO7gkvvliCCAPsnNb9nRD61MZZWs7Mp1QL10Gi0K9HONehXAaFAa+lJlARRzQy8KDgjo1qNQvQEIroNGNdjjLsqL8zkKPU8aC4/DbY+eZsU43IrhL85CLXHXKD7kdKtmP2mTIsSm5J14cBqeFJri48PhVij3UjU+egJdj4nePrVQ7F4hpp55n45VsONsxa1vIA+9eGX5drs1yY8n+rniZcotUbjJTkudNPxpzLGWYA8BqT4ConamIBJt8o0HS5/wAXrPHpbxKdh+zy4uWSRmZDHlGZL3YMdUKsSoACgggA68613CYZIkVEGVVFgP8AviaqXwvw2XBmQ8ZHY+i7ot7GrpXvj8cOd7lXaFChWmQoUKFAKp3xO2Os+zpiEu8aF0I4jLYsPEZQdPCrjRGUHQjjQeQVe460tLPI5BkdnsLLmJNh0F6W2zhVixM8S/LHNKi+SyED6AU0vQ6MaFFvXaDtdvXKFAYGjA6ik66KBS9ctXK6DVHL1J9m5o1xUbSEKoJ1OihspC3PIXNR/GiMtRZeVYe1m1ldjDCwKA77LqDr8oPMeIpDshtAQ4lcxsrqU9bgr9Vt61BE20A0oshrMkk4tzty603H7QN8g+ZtLDpeovGNmZIxpd1W/wC0xAvUfs3E2wve5byEsGckknW3ppp6UnIxDx68JYR7uCT9K85Pbqyz7j16N2TgVghjhQbqKFHjYak+JNz60+oicB5Cj17OMKFChQChQoUH/9k="
    },

    {
      name: "Shirt 4",
      category: "Men",
      description: "good shirt fit",
      image: "data:image/jpeg;base64,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"
    }


  ]
  res.render('index', {products,admin:true});
});

module.exports = router;

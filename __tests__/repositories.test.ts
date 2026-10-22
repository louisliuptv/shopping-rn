import {
  FallbackShopRepository,
  HttpShopRepository,
  FixtureShopRepository,
} from '../src/testing';
import type { ShopRepository } from '../src/testing';

describe('repositories', () => {
  it('http repository maps the API payload into domain entities', async () => {
    const repository = new HttpShopRepository({
      fetchSeller: async () => ({
        name: 'Congee Aroma Kitchen',
        description: 'Hummingbird Express',
        deliveryTime: 38,
        score: 4.2,
        serviceScore: 4.1,
        foodScore: 4.3,
        rankRate: 69.2,
        minPrice: 20,
        deliveryPrice: 4,
        ratingCount: 24,
        sellCount: 90,
        bulletin: 'Notice',
        avatar: 'avatar.png',
        pics: [],
        infos: [],
        supports: [{ type: 0, description: '¥5 off orders over ¥28 paid online' }],
      }),
      fetchGoods: async () => [
        {
          name: 'Popular',
          type: -1,
          foods: [
            {
              name: 'Century Egg & Pork Congee',
              price: 10,
              oldPrice: '',
              description: 'Savory congee',
              sellCount: 229,
              rating: 100,
              info: 'info',
              icon: 'icon.png',
              image: 'image.png',
              ratings: [
                {
                  username: 'a',
                  rateTime: 1,
                  score: 5,
                  rateType: 0,
                  text: 'Good',
                  avatar: 'a.png',
                },
              ],
            },
          ],
        },
      ],
      fetchRatings: async () => [],
    });

    const seller = await repository.getSeller('1');
    expect(seller.id).toBe('1');
    expect(seller.minPrice).toBe(20);
    expect(seller.supports).toHaveLength(1);

    const goods = await repository.getGoods('1');
    expect(goods).toHaveLength(1);
    expect(goods[0].foods[0].id).toBe('g0-f0');
    expect(goods[0].foods[0].ratings).toHaveLength(1);
    expect(goods[0].foods[0].ratings[0].recommend).toEqual([]);

    expect(await repository.getRatings('1')).toEqual([]);
  });

  it('falls back to the bundled fixture when the remote source fails', async () => {
    const failing: ShopRepository = {
      getSeller: () => Promise.reject(new Error('offline')),
      getGoods: () => Promise.reject(new Error('offline')),
      getRatings: () => Promise.reject(new Error('offline')),
    };
    const info = jest.spyOn(console, 'info').mockImplementation(() => {});

    const repository = new FallbackShopRepository(failing, new FixtureShopRepository());
    const goods = await repository.getGoods('1');

    expect(goods.length).toBeGreaterThan(0);
    expect(goods[0].foods.length).toBeGreaterThan(0);
    expect(info).toHaveBeenCalled();
    info.mockRestore();
  });

  it('propagates errors when the fallback is disabled', async () => {
    const failing: ShopRepository = {
      getSeller: () => Promise.reject(new Error('offline')),
      getGoods: () => Promise.reject(new Error('offline')),
      getRatings: () => Promise.reject(new Error('offline')),
    };
    const repository = new FallbackShopRepository(failing, new FixtureShopRepository(), false);
    await expect(repository.getGoods('1')).rejects.toThrow('offline');
  });

  it('fixture repository exposes the same menu as the mock server payload', async () => {
    const repository = new FixtureShopRepository();
    const goods = await repository.getGoods('1');
    expect(goods).toHaveLength(9);
    expect(goods[0].name).toBe('Popular');
    expect((await repository.getRatings('1'))).toHaveLength(24);
    expect((await repository.getSeller('7')).id).toBe('7');
  });
});
